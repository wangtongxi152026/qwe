import "./styles.css";
import { memo } from "react";
function Child({ number, title, o, type }) {
  console.log(`子组件更新${type}`);
  return (
    <div className="App">
      <h1>Child</h1>
      {type}
      {title}
      {JSON.stringify(o)}
    </div>
  );
}
export default memo(Child);
