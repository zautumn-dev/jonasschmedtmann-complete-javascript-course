'use strict';

// const plan = {
//   number: 300,
// };

// function addPlan() {
//   console.log(this);

//   this.number++;

//   console.log(this.number);
// }

// document.querySelector('.buy').addEventListener('click', addPlan.bind(plan));

// function myBind() {
//   return function () {};
// }

function booking() {
  let count = 0;
  return function () {
    console.log(`${++count}-----${myName}`);
  };
}

const myName = 'zninggo';

const booker = booking();

booker();
booker();
booker();
