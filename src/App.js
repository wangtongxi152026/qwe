import "./styles.css";
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  memo
} from "react";
import ChildMemo from "./Child";
import ChildShouldComponentUpdate from "./ChildShouldComponentUpdate";
const MemoChild = memo(({ item, deleteOne }) => {
  return <Fn text="memoChild" deleteOne={deleteOne} number={item} />;
});

export default function App() {
  const [number, setNumber] = useState(1);
  const [o, seto] = useState({ a: "title", b: [1, 2, 3] });
  const [o1, seto1] = useState({ a: 1, b: 2 });

  let ref = useRef(o.b.length);
  // useEffect(() => {
  //   console.log("ChildUseEffect更新");
  //   setNumber(number + 1);
  //   // 依赖项为[] 仅在挂载时执行 类似componentDidMount
  //   // 不填写依赖项 mount update 都会执行
  // }, []);
  const f1 = () => {
    setNumber(number + 1);
    ref.current++;
    o.b.push(ref.current);
    seto({ ...o });
  };
  const f2 = () => {
    o1.a = o1.a + "e";
    seto1({ ...o1 });
  };
  const deleteOne = useCallback((n) => {
    o.b.splice(findIndex(n), 1);
    seto({ ...o });
  }, []);
  const findIndex = useCallback((n) => o.b.findIndex((ele) => ele === n), [o]);
  const ChildUseMemo = useMemo(() => {
    return (o.b || []).map((item) => (
      <MemoChild deleteOne={deleteOne} key={item} item={item} />
    ));
  }, [o, deleteOne]);
  return (
    <div className="App">
      {ChildUseMemo}
      <ChildMemo o={o1} title={o.a} type="o1" number={"o1"} />
      <ChildMemo o={o} title={o.a} type="o" number={"o"} />
      {/* <ChildShouldComponentUpdate o={o} title={o.a} /> */}
      <br />
      {(o.b || []).map((item) => (
        <MemoChild deleteOne={deleteOne} key={item} item={item} />
      ))}
      {/* <Fn number={"常量"} /> */}
      <MemoChild item="item" />
      <button onClick={f1}>+</button>
      <button onClick={f2}>-</button>
      <div>number{number}</div>
      <div>o:{o.b}</div>
      <div>o1:{o1.b}</div>
    </div>
  );
}
let Fn = ({ number, text = "Fn", deleteOne }) => {
  console.log(`子组件更新${text}${number}`);
  const clickItem = () => {
    console.log("deleteOne", number);
    if (typeof deleteOne === "function") {
      deleteOne(number);
    }
  };
  return (
    <div onClick={clickItem} className="App">
      {`${text}子组件更新${number}`}
    </div>
  );
};
