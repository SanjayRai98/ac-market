import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './page/NotFound';
import Home from './page/Home';
import { ServerProvider } from './context/server.context';
import { MessageProvider } from './context/message.context';
import { AuthProvider } from './context/AuthContext';
import Seller from './page/Seller';

function App() {
  return (
    <>
      <ServerProvider>
        <MessageProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sellerdashboard" element={<Seller />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </MessageProvider>
      </ServerProvider>
    </>
  );
}

export default App;
