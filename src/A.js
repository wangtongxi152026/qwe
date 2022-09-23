import { useEffect, useState } from "react";
import { useCreateStore, ReduxContext } from "./store/useCreateStore";
import { useConnect } from "./store/useConnect";
export default function Root() {
  const reducer = (state, action) => {
    const { type, payload } = action;
    if (type === "setA") {
      return {
        ...state,
        mesA: payload
      };
    } else if (type === "setB") {
      return {
        ...state,
        mesB: payload
      };
    } else if (type === "clear") {
      //清空
      return { mesA: "", mesB: "" };
    } else {
      return state;
    }
  };
  const store = useCreateStore(reducer, { mesA: "111", mesB: "111" });
  return (
    <div>
      <ReduxContext.Provider value={store}>
        <Index />
        {/* <App /> */}
      </ReduxContext.Provider>
    </div>
  );
}

function Index() {
  const [isShow, setShow] = useState(true);
  console.log("index 渲染");
  return (
    <div>
      <CompA />
      <CompB />
      <CompC />
      <button onClick={() => setShow(!isShow)}>点击</button>

      {isShow && <CompD />}
    </div>
  );
}

function CompA() {
  const [value, setValue] = useState("");
  const [state, dispatch] = useConnect((state) => ({ mesB: state.mesB }));
  useEffect(() => {
    console.log("组件Astate变化了", state);
  }, [state]);
  return (
    <div className="component_box">
      <p> 组件A:{value}</p>
      <p>组件B对我说 ： {state.mesB} </p>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="对B组件说"
      />
      <button onClick={() => dispatch({ type: "setA", payload: value })}>
        确定
      </button>
    </div>
  );
}

function CompB() {
  const [value, setValue] = useState("");
  const [state, dispatch] = useConnect((state) => ({ mesA: state.mesA }));
  useEffect(() => {
    console.log("组件Bstate变化了", state);
  }, [state]);
  return (
    <div className="component_box">
      <p> 组件B:{value}</p>
      <p>组件A对我说 ： {state.mesA} </p>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="对A组件说"
      />
      <button onClick={() => dispatch({ type: "setB", payload: value })}>
        确定
      </button>
    </div>
  );
}

function CompC() {
  const [state] = useConnect((state) => ({
    mes1: state.mesA,
    mes2: state.mesB
  }));
  return (
    <div className="component_box">
      <p>组件A ： {state.mes1} </p>
      <p>组件B ： {state.mes2} </p>
    </div>
  );
}

function CompD() {
  const [, dispatch] = useConnect();
  console.log("D 组件更新");
  return (
    <div className="component_box">
      <button onClick={() => dispatch({ type: "clear" })}> 清空 </button>
    </div>
  );
}
