let person = { firstName: "Stevan", lastName: "Stevanovic", age: "45" };

console.log(person);

let JSONPerson = JSON.stringify(person);

console.log(JSONPerson);

console.log(JSON.parse(JSONPerson));

let numbers = [1, 2, 3, 4, 5];

let JSONNumbers = JSON.stringify(numbers);

console.log(numbers);

console.log(JSONNumbers);

convertedNumbers = JSON.parse(JSONNumbers);
convertedNumbers.forEach((element) => {
  console.log(element);
});
