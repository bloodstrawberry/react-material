let obj1 = {
  a: "a1",
  b: "b1",
  c: "c1",
  d: "d1",
  e: "e1",
  f: "f1",
  g: "g1",
};

let obj2 = {
  a: "a2",
  b: "b2",
  g: "g2",
  h: "h2",
};

console.log("before : ", obj1, obj2);

for (let key in obj1) {
  if (obj2.hasOwnProperty(key)) {
    obj1[key] = obj2[key];
  }
}

console.log("after  : ", obj1, obj2);
