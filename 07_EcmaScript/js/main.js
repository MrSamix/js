// Task 1
let square = (x) => x*x;
console.log(square(5));

// Task 2
let divide = (x, y) => {
    if (y === 0) {
        return "Error: Division by zero";
    }
    return x / y;
};
console.log(divide(10, 2));
console.log(divide(10, 0));

// Task 3
let randomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
}
console.log(randomNumber());

// Task 4
let calculator = {
    x: 10,
    y: 5,
    sum: function(){return this.x + this.y}
};
console.log(calculator.sum());

// Task 5
let minMax = (arr) => {
    if (arr.length === 0) {
        return "Array is empty";
    }
    let min = Math.min(...arr);
    let max = Math.max(...arr);
    return { min: min, max: max };
}
console.log(minMax([1, 2, 3, 4, 5]));

// Task 6
const user = { name: "Alice", age: 25, isAdmin: false };
let {name, age} = user;
console.log(name);
console.log(age);

// Task 7
const car = { brand: "Toyota", model: "Camry", year: 2020 };
let make = car.brand;
let model = car.model;
console.log(make);
console.log(model);

// Task 8
const options = { width: 100, height: 200 };
let {width, height, color = "black"} = options;
console.log(width);
console.log(height);
console.log(color);


// Task 9
function printUser({ name, age }) {
    console.log(`Name: ${name}, Age: ${age}`);
}
printUser({ name: "Bob", age: 30 });

// Task 10
const company = {
    name: "TechCorp",
    address: { city: "Kyiv", street: "Main St" }
};
name = company.name;
city = company.address.city;
street = company.address.street;
console.log(name);
console.log(city);
console.log(street);

// Task 11
class Animal {
    sound(){
        console.log("Some sound");
    }
    info() {
        console.log("This is an Animal class");
    }
}

let animal = new Animal();
animal.sound();
new Animal().info();
// Task 12
class Dog extends Animal {
    constructor(breed="") {
        super();
        this.breed = breed;
    }
    sound() {
        console.log("Bark");
    }
    makeSound() {
        super.sound();
        this.sound();
    }
}
let dog = new Dog("Labrador");
dog.sound();

// Task 13
const fruits = ["apple", "banana", "orange"];
let [first, second] = fruits;
console.log(first);
console.log(second);

// Task 14
const numbers = [1, 2, 3, 4, 5];
let [a,,b,,c] = numbers;
console.log(a);
console.log(b);
console.log(c);

// Task 15
const colors = ["red", "green"];

let [color1, color2, color3 = "blue"] = colors;
console.log(color1);
console.log(color2);
console.log(color3);

// Task 16
let x = 5;
let y = 10;

[x, y] = [y, x];
console.log(x);
console.log(y);

// Task 17
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

for (const { name, age } of users) {
    console.log(`Name: ${name}, Age: ${age}`);
}