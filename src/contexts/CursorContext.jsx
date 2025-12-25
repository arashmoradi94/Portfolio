import { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');

  const setVariant = (variant) => {
    setCursorVariant(variant);
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, setVariant }}>
      {children}
    </CursorContext.Provider>
  );
};


