import { createContext, useRef } from "react";
import ReduxHooksStore from "./ReduxHooksStore";
export const ReduxContext = createContext(null);
/* 用于产生 reduxHooks 的 store */
export const useCreateStore = (reducer, initState) => {
  const store = useRef(null);
  /* 如果存在——不需要重新实例化 Store */
  if (!store.current) {
    store.current = new ReduxHooksStore(reducer, initState).exportStore();
  }
  return store.current;
};
