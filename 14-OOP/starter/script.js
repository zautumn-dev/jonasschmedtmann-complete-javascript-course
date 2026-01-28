// 'use strict';
// // Function.prototype.prototype = {};

// // Function.prototype.log = console.log;

// function Person(firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// }

// function User(userName) {}

// Person.prototype.calcAge = function () {
//   return new Date().getFullYear() - this.birthYear;
// };
// Person.prototype.type = 'none';

// console.log(Person.prototype);
// console.log(Person.__proto__.__proto__ === Object.prototype);

// const lupinus = new Person('lupinus', 2000);

// const method = { foo() {} }.foo;

// console.log(method.prototype);

// // console.log(lupinus);

// // console.log(lupinus instanceof Array);

// // console.log(Person.prototype);

// // console.log(lupinus.calcAge());

// // console.log(Object.hasOwn(lupinus, 'firstName'));
// // console.log(Object.hasOwn(lupinus, 'type '));

// // const person = {
// //   name: '123',
// // };

// // const user = {
// //   age: 18,
// //   __proto__: person,
// // };

// // for (const attr in user) {
// //   if (Object.hasOwn(user, attr)) console.log(attr);
// // }

// // console.log(Person.prototype instanceof );
// // console.log(Person.prototype.__proto__);
// // console.log(Person.prototype.__proto__ === Object.prototype);

// // console.dir(Function.prototype);

// // console.log(Person instanceof Function);

// // console.log(Function.prototype.prototype);

class Person {
  birthYear;
  constructor(firstName, birthYear) {}

  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }
}

console.log(Person.prototype);
// console.dir(Person.__proto__ === Function.prototype);
