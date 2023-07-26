let colors = ["red", "green", "blue", "white", "black"];

for (i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

console.log("---------------------");

colors.forEach((color) => {
  console.log(color);
});

let rotateArray = (arr, steps) => {
  const n = arr.length;
  steps = steps % n;

  if (steps === 0) {
    return arr;
  }

  let rotated = arr.slice(length - steps).concat(arr.slice(0, length - steps));
  return rotated;
};

let rotatedColors = rotateArray(colors, 6);
console.log(rotatedColors);

console.log("---------------------");

let numbers = [100, 1000, 70];

let sumArray = (numbers) => {
  let sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    50
  );
  return sum;
};

console.log(sumArray(numbers));

console.log("---------------------");

let mirror = (n) => {
  let newArray = [];
  for (i = 0; i <= n; i++) {
    newArray.push(i);
  }
  for (i = n - 1; i >= 0; i--) {
    newArray.push(i);
  }
  return newArray;
};

console.log(mirror(10));

console.log("---------------------");

var myZoo = [
  ["King Kong", ["gorilla", 42]],
  ["Nemo", ["fish", 5]],
  ["Punxsutawney Phil", ["groundhog", 11]],
];

let zooInventory = (myZoo) => {
  let prepared = [];
  myZoo.forEach((element) => {
    prepared.push(
      element[0] + " the " + element[1][0] + " is " + element[1][1]
    );
  });

  return prepared;
};

console.log(zooInventory(myZoo));
