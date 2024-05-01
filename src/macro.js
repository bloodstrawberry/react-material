const sum = function add(a, b) {
  console.log(arguments.callee.name);
  return a + b;
}

//let a = sum(1,3);
