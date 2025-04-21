// import { useEffect, useState } from 'react';
// import { Button } from 'rsuite';

// function FullMarketplace() {
//   const [marketplace, setMarketplace] = useState([]);
//   const [expandedSubs, setExpandedSubs] = useState({}); // Track expanded subcategory IDs

//   useEffect(() => {
//     fetch('http://localhost/acmarket/api/marketplace.php')
//       .then(res => res.json())
//       .then(data => setMarketplace(data))
//       .catch(err => console.error('Error loading marketplace:', err));
//   }, []);

//   const toggleShowMore = subcategoryId => {
//     setExpandedSubs(prev => ({
//       ...prev,
//       [subcategoryId]: !prev[subcategoryId],
//     }));
//   };

//   console.log(marketplace);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">All Accounts Marketplace</h1>

//       {marketplace.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         marketplace.map(category => (
//           <div key={category.category_id} className="mb-8">
//             <h2 className="text-xl font-semibold text-blue-700 mb-3">
//               {category.category_name}
//             </h2>

//             {category.subcategories.length === 0 ? (
//               <p className="text-gray-500 mb-4">No subcategories found.</p>
//             ) : (
//               category.subcategories.map(sub => {
//                 const isExpanded = expandedSubs[sub.subcategory_id] || false;
//                 const accountsToShow = isExpanded
//                   ? sub.accounts
//                   : sub.accounts.slice(0, 1);
//                 const hasMore = sub.accounts.length > 1;

//                 return (
//                   <div key={sub.subcategory_id} className="mb-6 pl-4">
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                       {sub.subcategory_name}
//                     </h3>

//                     {sub.accounts.length === 0 ? (
//                       <p className="text-sm text-gray-500">
//                         No accounts available.
//                       </p>
//                     ) : (
//                       <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                           {accountsToShow.map(acc => (
//                             <div
//                               key={acc.account_id}
//                               className="border p-4 rounded-lg shadow hover:shadow-md transition"
//                             >
//                               <h4 className="font-bold text-md mb-1">
//                                 {acc.title}
//                               </h4>
//                               <p className="text-sm text-gray-700 mb-2">
//                                 {acc.description}
//                               </p>
//                               <p className="text-green-600 font-semibold">
//                                 ₹{acc.price}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 Stock: {acc.stock}
//                               </p>
//                               <Button
//                                 onClick={() => {
//                                   alert(acc.account_id);
//                                 }}
//                               >
//                                 Buy Now
//                               </Button>
//                             </div>
//                           ))}
//                         </div>

//                         {hasMore && (
//                           <button
//                             className="mt-3 text-blue-600 underline text-sm"
//                             onClick={() => toggleShowMore(sub.subcategory_id)}
//                           >
//                             {isExpanded ? 'Show Less' : 'Show More'}
//                           </button>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default FullMarketplace;

import { useEffect, useState } from 'react';
import PurchaseModal from '../Modal/PurchaseModal';

function ProductsDisplay() {
  const [marketplace, setMarketplace] = useState([]);
  const [expandedSubs, setExpandedSubs] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const [purchaseModalShow, setPurchaseModalShow] = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost/acmarket/api/marketplace.php')
      .then(res => res.json())
      .then(data => setMarketplace(data))
      .catch(err => console.error('Error loading marketplace:', err));
  }, []);

  const toggleShowMore = subcategoryId => {
    setExpandedSubs(prev => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId],
    }));
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleBuyClick = account => {
    // alert(`You clicked Buy on "${account.title}" (ID: ${account.account_id})`);
    // Later: Redirect to payment page, add to cart, or open Razorpay checkout
    setAccountDetails(account);

    setPurchaseModalShow(true);
  };

  const filterAccounts = accounts => {
    return accounts.filter(
      acc =>
        acc.title.toLowerCase().includes(searchQuery) ||
        acc.description.toLowerCase().includes(searchQuery)
    );
  };

  console.log(marketplace);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Accounts Marketplace</h1>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search accounts..."
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 mb-6"
          onChange={handleSearchChange}
          value={searchQuery}
        />

        {marketplace.length === 0 ? (
          <p>Loading...</p>
        ) : (
          marketplace.map(category => {
            const subcategoriesWithMatches = category.subcategories
              .map(sub => {
                const filteredAccounts = filterAccounts(sub.accounts);
                return { ...sub, filteredAccounts };
              })
              .filter(sub => sub.filteredAccounts.length > 0);

            if (subcategoriesWithMatches.length === 0) return null;

            return (
              <div key={category.category_id} className="mb-8">
                <h2 className="text-xl font-semibold text-blue-700 mb-3">
                  {category.category_name}
                </h2>

                {subcategoriesWithMatches.map(sub => {
                  const isExpanded = expandedSubs[sub.subcategory_id] || false;
                  const accountsToShow = isExpanded
                    ? sub.filteredAccounts
                    : sub.filteredAccounts.slice(0, 5);
                  const hasMore = sub.filteredAccounts.length > 5;

                  return (
                    <div key={sub.subcategory_id} className="mb-6 pl-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {sub.subcategory_name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accountsToShow.map(acc => (
                          <div
                            key={acc.account_id}
                            className="border p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
                          >
                            <div>
                              <h4 className="font-bold text-md mb-1">
                                {acc.title}
                              </h4>
                              <p className="text-sm text-gray-700 mb-2">
                                {acc.description}
                              </p>
                              <p className="text-green-600 font-semibold">
                                ₹{acc.price}
                              </p>
                              <p className="text-xs text-gray-500 mb-3">
                                Stock: {acc.stock}
                              </p>
                            </div>
                            <button
                              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                              onClick={() => handleBuyClick(acc)}
                            >
                              Buy
                            </button>
                          </div>
                        ))}
                      </div>

                      {hasMore && (
                        <button
                          className="mt-3 text-blue-600 underline text-sm"
                          onClick={() => toggleShowMore(sub.subcategory_id)}
                        >
                          {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>

      <div>
        <PurchaseModal
          purchaseModalShow={purchaseModalShow}
          setPurchaseModalShow={setPurchaseModalShow}
          accountDetails={accountDetails}
        />
      </div>
    </>
  );
}

export default ProductsDisplay;
