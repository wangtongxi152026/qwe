import { useContext, useRef, useState, useMemo, useEffect } from "react";
import { ReduxContext } from "./useCreateStore";
import { equal } from "../../utils";
export const useConnect = (mapStoreToState = () => {}) => {
  const contextValue = useContext(ReduxContext);
  const { getInitState, subscribe, unSubscribe, dispatch } = contextValue;
  /* 用于传递给业务组件的 state  */
  const stateValue = useRef(getInitState(mapStoreToState));
  const [, forceUpdate] = useState();
  const connectValue = useMemo(() => {
    const state = {
      cacheState: stateValue.current,
      update: (newState) => {
        /* 获取订阅的 state */
        const selectState = mapStoreToState(newState);
        const isEqual = equal(state.cacheState, selectState);
        if (!isEqual) forceUpdate();
      }
    };
    return state;
  }, [contextValue]);

  useEffect(() => {
    /* 组件挂载——注册 connect */
    console.log({ connectValue });
    const name = subscribe(connectValue);
    /* 组件卸载 —— 解绑 connect */
    return () => {
      unSubscribe(name);
    };
  }, [connectValue]);
  return [stateValue.current, dispatch];
};
