import { unstable_batchedUpdates } from "react-dom";
export default class ReduxHooksStore {
  constructor(reducer, initState) {
    this.name = "__ReduxHooksStore__";
    this.id = 0;
    this.reducer = reducer;
    this.state = initState;
    this.mapConnects = {};
  }

  exportStore() {
    return {
      dispatch: this.dispatch.bind(this),
      subscribe: this.subscribe.bind(this),
      unSubscribe: this.unSubscribe.bind(this),
      getInitState: this.getInitState.bind(this)
    };
  }

  getInitState(mapStoreToState) {
    return mapStoreToState(this.state);
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.publicRender();
  }

  /* 注册每个 connect  */
  subscribe(connectCurrent) {
    ++this.id;
    const connectName = this.name + this.id;
    this.mapConnects[connectName] = connectCurrent;
    return connectName;
  }

  unSubscribe(connectName) {
    delete this.mapConnects[connectName];
  }

  /* 更新需要更新的组件 */
  publicRender() {
    unstable_batchedUpdates(() => {
      for (let name in this.mapConnects) {
        const { update } = this.mapConnects[name];
        update(this.state);
      }
    });
  }
}
