// @ts-check
import React, { createContext, useContext, useEffect, useState } from 'react';
const FlagCtx = createContext({});
export function FlagProvider({ children }){
  const [flags, setFlags] = useState({});
  useEffect(()=>{ fetch('http://localhost:3001/flags').then(r=>r.json()).then(setFlags); },[]);
  return <FlagCtx.Provider value={flags}>{children}</FlagCtx.Provider>;
}
export const useFlag = (key) => !!useContext(FlagCtx)[key]?.enabled;
