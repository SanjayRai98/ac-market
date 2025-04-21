// import { useEffect, useState } from 'react';

// function DisplayProduct() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost/acmarket/api/getAccounts.php')
//       .then(res => res.json())
//       .then(data => setCategories(data))
//       .catch(err => console.error('Error fetching data', err));
//   }, []);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-bold text-center mb-10">Marketplace</h1>

//       {categories.map(category => (
//         <div key={category.id} className="mb-10">
//           <h2 className="text-3xl font-semibold mb-4 text-blue-700">
//             {category.name}
//           </h2>

//           {Object.values(category.subcategories).map(subcat => (
//             <div
//               key={subcat.id}
//               className="mb-6 bg-white p-4 rounded-2xl shadow-md border border-gray-200"
//             >
//               <h3 className="text-2xl font-medium text-gray-800 mb-3">
//                 {subcat.name}
//               </h3>

//               {subcat.accounts.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {subcat.accounts.map(acc => (
//                     <div
//                       key={acc.id}
//                       className="bg-gray-50 p-4 rounded-xl border hover:shadow-lg transition"
//                     >
//                       <h4 className="text-lg font-semibold mb-2">
//                         {acc.title}
//                       </h4>
//                       <p className="text-sm text-gray-700 mb-1">
//                         Price:{' '}
//                         <span className="font-medium text-green-600">
//                           ${acc.price}
//                         </span>
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         Stock: {acc.stock}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">
//                   No accounts available in this subcategory.
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DisplayProduct;

import { useEffect, useState } from 'react';

function DisplayProduct() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);

  useEffect(() => {
    fetch('http://localhost/acmarket/api/getAccounts.php')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setFilteredCategories(data);
      });
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [search, sort, selectedCats, selectedSubs]);

  const toggleCheckbox = (arr, setFn, id) => {
    setFn(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filterAndSortData = () => {
    const newFiltered = categories
      .filter(cat => selectedCats.length === 0 || selectedCats.includes(cat.id))
      .map(cat => {
        const subcategories = Object.values(cat.subcategories || {})
          .filter(
            sub => selectedSubs.length === 0 || selectedSubs.includes(sub.id)
          )
          .map(subcat => {
            let accounts = subcat.accounts || [];

            // Filter
            if (search) {
              accounts = accounts.filter(
                acc =>
                  acc.title?.toLowerCase().includes(search.toLowerCase()) ||
                  acc.description?.toLowerCase().includes(search.toLowerCase())
              );
            }

            // Sort
            accounts.sort((a, b) => {
              if (sort === 'low-to-high') return a.price - b.price;
              if (sort === 'high-to-low') return b.price - a.price;
              if (sort === 'newest')
                return new Date(b.created_at) - new Date(a.created_at);
              return 0;
            });

            return { ...subcat, accounts };
          });

        return { ...cat, subcategories };
      });

    setFilteredCategories(newFiltered);
  };

  return (
    <div className="flex max-w-7xl mx-auto p-6 gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products"
          className="w-full p-2 mb-4 border rounded-lg"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Sort */}
        <label className="block mb-1 font-medium">Sort by:</label>
        <select
          className="w-full p-2 mb-4 border rounded-lg"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>

        {/* Category Filter */}
        <h4 className="font-semibold mb-2">Categories</h4>
        {categories.map(cat => (
          <div key={cat.id} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat.id)}
                onChange={() =>
                  toggleCheckbox(selectedCats, setSelectedCats, cat.id)
                }
              />
              {cat.name}
            </label>

            {/* Subcategories if category is selected */}
            {selectedCats.includes(cat.id) &&
              Object.values(cat.subcategories || {}).map(subcat => (
                <label
                  key={subcat.id}
                  className="flex items-center gap-2 pl-5 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubs.includes(subcat.id)}
                    onChange={() =>
                      toggleCheckbox(selectedSubs, setSelectedSubs, subcat.id)
                    }
                  />
                  {subcat.name}
                </label>
              ))}
          </div>
        ))}
      </div>

      {/* Products Area */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Marketplace Results</h2>

        {filteredCategories.map(category =>
          Object.values(category.subcategories || {}).map(
            subcat =>
              subcat.accounts.length > 0 && (
                <div key={subcat.id} className="mb-8">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">
                    {category.name} / {subcat.name}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {subcat.accounts.map(acc => (
                      <div
                        key={acc.id}
                        className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-lg"
                      >
                        <h4 className="text-lg font-medium mb-1">
                          {acc.title}
                        </h4>
                        <p className="text-sm mb-1 text-gray-600">
                          {acc.description}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-green-600">
                            ${acc.price}
                          </span>{' '}
                          — Stock: {acc.stock}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
}

export default DisplayProduct;
