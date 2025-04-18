import SellerDashboard from '../components/dashboard/SellerDashboard';

const Seller = () => {
  return (
    <div>
      <h1>Seller Dashboard</h1>
      <p>
        This is the seller dashboard where sellers can manage their accounts.
      </p>
      {/* Add your seller dashboard components here */}
      <div>
        <SellerDashboard />
      </div>
    </div>
  );
};

export default Seller;
