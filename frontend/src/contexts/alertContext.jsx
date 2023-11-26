import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const addError = (alertMessage) => {
    setAlert('e' + alertMessage);
  };

  const addMessage = (alertMessage) => {
    setAlert('m' + alertMessage);
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, addError, addMessage, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
