import React, { createRef } from "react";
import "./styles.css";
import { equal } from "../utils";
let ref = createRef(0);
export default class ChildShouldComponentUpdate extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log("ChildShouldComponentUpdate", { props: this.props, nextProps });
    const res = !equal(this.props, nextProps);
    ref.current++;

    return res;
  }
  render() {
    const { number, title, o } = this.props;
    console.log("current子组件更新shouldComponentUpdate", ref.current);
    return (
      <div className="App">
        <div>子组件shouldComponentUpdate</div>
        <div>{number}</div>
        {this.props.title}
        {title}
        {JSON.stringify(o)}
        <div>current:{ref.current}++</div>
        <br />
      </div>
    );
  }
}
