import { createContext, useContext } from 'react';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const serverLink = 'http://127.0.0.1';

  // production only
  // const serverLink = '';

  return (
    <ServerContext.Provider value={{ serverLink }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServerLink = () => useContext(ServerContext);
