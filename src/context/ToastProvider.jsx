// ToastProvider.jsx
import { createContext, useContext, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastApi = useMemo(
    () => ({
      success: msg => toast.success(msg),
      error: msg => toast.error(msg),
      loading: msg => toast.loading(msg),
      custom: (msg, icon) => toast(msg, { icon }),
      promise: (promiseFn, msgs) =>
        toast.promise(promiseFn, {
          loading: msgs.loading || 'Loading...',
          success: msgs.success || 'Success!',
          error: msgs.error || 'Something went wrong.',
        }),
      dismiss: () => toast.dismiss(),
    }),
    []
  );

  return (
    <ToastContext.Provider value={toastApi}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
