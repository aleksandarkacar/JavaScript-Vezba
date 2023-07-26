var arr = [2, 3, 4, 5];

sqr = (arr) => {
  return arr.map(function (x) {
    return x * x;
  });
};

var arr2 = sqr(arr);
console.log(arr2);
