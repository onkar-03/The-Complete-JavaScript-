// Each and every function in JS automatically has a property called prototype. Every object that is created by a certain constructor function will get access to all the methods and properties that we define on the constructor prototype property

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// --- Using the .prototype Property of constructor function ---

// --- Define:
// In JavaScript, the prototype property of a constructor function plays a crucial role in the inheritance and method sharing mechanism for objects created by that constructor
// The prototype property of a constructor function is an object
// Any properties or methods added to this prototype object will be shared by all instances created by the constructor

// --- Instance Inheritance:
// When a new object is created using the new keyword with a constructor function, the new object’s internal [[Prototype]] (also accessible via __proto__) is set to the constructor’s prototype object
// This means that all instances inherit methods and properties from the constructor’s prototype

// --- Memory Efficient:
// Since all instances share the same prototype object, methods and properties defined on the prototype are not duplicated across each instance, saving memory

// With prototype only one instance of calcAge is created and shared between all instances created using the Constructor Function
Person.prototype.calcAge = function () {
  return 2024 - this.birthYear;
};
// .prototype is an object property

const onkar = new Person('onkar', 2001);
console.log(onkar.calcAge()); // 23

console.log(onkar); // Person {firstName: 'onkar', birthYear: 2001}
console.log(onkar.__proto__); // {calcAge: ƒ}
console.log(onkar.__proto__.constructor); // points to the constructor function

// Person.prototype is not the prototype of Person, it is what is going to be used as the prototype of all the objects that are created with the Person constructor function
console.log(onkar.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(onkar)); // true

// .prototype should've been named .prototypeOfLinkedObjects to be more clear.

// We can also set properties to the prototype
Person.prototype.species = 'Homo Sapiens';
// species property is not directly in the object, so it's not it's own property
console.log(onkar.species); // Homo Sapiens
console.log(onkar.__proto__); // {calcAge: ƒ, species: 'Homo Sapiens', constructor: ƒ}

console.log(onkar.hasOwnProperty('firstName')); // true
console.log(onkar.hasOwnProperty('species')); // false
