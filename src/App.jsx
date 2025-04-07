import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './page/NotFound';
import Home from './page/Home';
import { ServerProvider } from './context/server.context';
import { StatusProvider } from './context/status.context';
import { MessageProvider } from './context/message.context';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <ServerProvider>
        <StatusProvider>
          <MessageProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </MessageProvider>
        </StatusProvider>
      </ServerProvider>
    </>
  );
}

export default App;
