import AcHeader from '../components/ui/AcHeader';

import { Button, ButtonToolbar } from 'rsuite';
import { useAuth } from '../context/AuthContext';
import DisplayProduct from '../components/homecomponent/DisplayProduct';
import ProductsDisplay from '../components/homecomponent/ProductDisplay';

const Home = () => {
  const { user } = useAuth(); // Assuming you have a useAuth hook to get user info
  console.log('user', user);

  const getData = async () => {
    const res = await fetch('http://localhost/acmarket/api/test.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John Doe' }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <title>Home Page</title>
      <meta
        name="description"
        content="Welcome to the home page of our application."
      />
      <link rel="canonical" href="/" />
      <meta property="og:title" content="Home Page" />

      <AcHeader />

      <div>
        <h1 className=" text-center ">Welcome to the Home Page</h1>
        <p>This is the home page of our application.</p>
        <h3></h3>
      </div>

      <ButtonToolbar>
        <Button onClick={() => getData()}> Get Data</Button>
      </ButtonToolbar>

      <div>
        <DisplayProduct />
      </div>

      {/* <div>
        <ProductsDisplay />
      </div> */}
    </div>
  );
};

export default Home;
