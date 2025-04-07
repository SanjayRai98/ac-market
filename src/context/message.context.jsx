import { createContext, useContext } from 'react';
import { Message, useToaster } from 'rsuite';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const toaster = useToaster();

  // for display notification message
  const displayMessage = (
    type = 'info',
    message = 'No Message',
    duration = 2000
  ) => {
    toaster.push(
      <Message showIcon type={type} closable>
        <strong>{message}</strong>
      </Message>,
      { placement: 'topCenter', duration: duration }
    );
  };

  return (
    <MessageContext.Provider value={{ displayMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useDisplayMessage = () => useContext(MessageContext);
