'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error('useDrawer must be used within a DrawerProvider');
  return context;
}
