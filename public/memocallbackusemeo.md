memo、useCallback、useMemo 三者的区别
相同点 1.都是在函数式组件中使用 2.都是为了阻止子组件的被动渲染(父组件重新 render，子组件也跟着 render)

不同点
1.memo

memo 类似于 PureCompoent 作用是优化组件性能，防止组件触发重渲染
不足: 如果参数中含有函数不能阻止
有点: 缓存组件
使用场景: 不给子组件传递函数，并且子组件根据自身以来渲染
2.useMemo

useMemo 其实和 memo 是一样的
不足: 如果参数中含有函数不能阻止
优点: 缓存变量(返回的变量)
使用场景: 不给子组件传递函数，并且子组件根据自身以来渲染
useMemo 使用
在子组件中通过 memo 方法，对子组件进行包裹
在父组件中，通过 useMemo 对传给子组件的数据进行包裹

```
const ChildComponent = memo(() => {
  return <div></div>;
});

const ParentComponent = () => {
 const [name, setName] = useState('tom');
 const userInfo = useMemo(() => {
  return {name, age: 20};
 },[]);
};
```

3.useCallback

useCallback 是解决上面两个的不足的
优点: 可以缓存函数，(返回的是函数，每次都返回新的函数)
使用场景: 给子组件传递函数，将要传递的函数用 useCallback 包裹起来
