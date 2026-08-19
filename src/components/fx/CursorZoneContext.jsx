import React, { createContext, useContext, useRef, useState } from 'react';

const CursorZoneContext = createContext(null);

export function CursorZoneProvider({ children }) {
  const [zone, setZone] = useState('default');
  return (
    <CursorZoneContext.Provider value={{ zone, setZone }}>
      {children}
    </CursorZoneContext.Provider>
  );
}

export function useCursorZoneContext() {
  const ctx = useContext(CursorZoneContext);
  if (!ctx) throw new Error('useCursorZoneContext must be used within CursorZoneProvider');
  return ctx;
}

/**
 * Wrap a section in this to make the custom cursor morph while the pointer
 * is over it. Purely a visual decoration layer — sections render identically
 * with or without it, so it degrades to nothing on touch devices.
 */
export function CursorZone({ type, className, children }) {
  const { setZone } = useCursorZoneContext();
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => setZone(type)}
      onMouseLeave={() => setZone('default')}
    >
      {children}
    </div>
  );
}
