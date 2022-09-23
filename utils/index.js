export const equal = (o1, o2) => {
  if (
    !(Object.prototype.toString.call(o1) === Object.prototype.toString.call(o2))
  ) {
    return false;
  }
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  return Object.keys(o1).every((v) => {
    if (o1[v] instanceof Object) {
      return equal(o1[v], o2[v]);
    } else {
      return o1[v] === o2[v];
    }
  });
};
