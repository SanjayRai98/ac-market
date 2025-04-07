import { createContext, useContext, useEffect, useState } from 'react';
import { useServerLink } from './server.context';
import axios from 'axios';

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const { serverLink } = useServerLink();

  const [isWebsiteOnUpdate, setIsWebsiteOnUpdate] = useState(false);

  useEffect(() => {
    const checkWebsiteStatus = async () => {
      try {
        const response = await axios.post(
          `${serverLink}/testing/test/website_status.php`,
          {
            protectionId: 'Nav##$56',
          }
        );

        // console.log(response.data);

        if (response.data.update_status === 1) {
          setIsWebsiteOnUpdate(true);
        } else if (response.data.update_status === 0) {
          setIsWebsiteOnUpdate(false);
        }
        // setIsWebsiteOnUpdate(response.data.update_status);
      } catch (error) {
        console.log(error);
      }
    };

    checkWebsiteStatus();
  }, [serverLink]);

  return (
    <StatusContext.Provider value={{ isWebsiteOnUpdate }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useWebStatus = () => useContext(StatusContext);
