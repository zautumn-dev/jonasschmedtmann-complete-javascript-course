'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

function displayMovements(movements = [], sorted = false) {
  containerMovements.textContent = '';

  const sortMovements = sorted
    ? [...movements].sort((a, b) => a - b)
    : movements;

  const movementsHtml = sortMovements.reduce((result, move, index) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const htmlTemplate = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${move} €</div>
    </div>
    `;

    return htmlTemplate + result;
  }, '');

  containerMovements.insertAdjacentHTML('afterbegin', movementsHtml);
  // containerMovements.innerHTML = movementsHtml;
  // console.log(movementsHtml);
}

function createUserName(userName = '') {
  return userName
    .toLowerCase()
    .split(' ')
    .map(str => str.at(0))
    .join('');
}

function handleUserName(accounts = []) {
  accounts.forEach(account => {
    Reflect.set(account, 'userName', createUserName(account.owner));
  });
}

function calcDisplayBalance(movements = []) {
  const totalBalance = movements.reduce((total, movement) => total + movement);
  labelBalance.textContent = `${totalBalance} €`;
}

function calcDisplayAmount(movements = [], cb) {
  return movements.filter(cb).reduce((total, movement) => total + movement);
}

function calcDisplaySummaryIn(movements = []) {
  const amount = calcDisplayAmount(movements, movement => movement > 0);
  labelSumIn.textContent = `${amount} €`;
}

function calcDisplaySummaryOut(movements = []) {
  const amount = calcDisplayAmount(movements, movement => movement < 0);
  labelSumOut.textContent = `${Math.abs(amount)} €`;
}

function calcDisplaySummaryInterest({ interestRate = 1, movements = [] }) {
  const interest = movements
    .filter(movement => movement > 0)
    .map(movement => movement * (interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((totalInterest, interest) => totalInterest + interest, 0);

  //   const interest =
  //     calcDisplayAmount(movements, movement => movement > 0) * (1.2 / 100);
  labelSumInterest.textContent = `${interest} €`;
}

let currentAccount = null;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const userName = inputLoginUsername.value;
  const pin = inputLoginPin.value;

  if (!userName || !pin) return;

  currentAccount = accounts.find(account => account.userName === userName);

  if (currentAccount?.pin !== pin - 0) return;
  console.log('登陆成功');

  labelWelcome.textContent = `欢迎回来~~ ${currentAccount.owner.split(' ').at(0)}`;

  containerApp.style.opacity = 1;

  // inputLoginUsername.value = inputLoginPin.value = '';
  // inputLoginPin.blur();

  clearInput(inputLoginUsername, inputLoginPin);

  calcAnyAmount(currentAccount);
});

function calcAnyAmount(account) {
  displayMovements(account.movements);
  calcDisplayBalance(account.movements);
  calcDisplaySummaryIn(account.movements);
  calcDisplaySummaryOut(account.movements);
  calcDisplaySummaryInterest(account);
}

function clearInput(...inputs) {
  inputs.forEach(input => {
    input.value = '';
    input.blur();
  });
}

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const transferUserName = inputTransferTo.value;
  const transterAmount = inputTransferAmount.value - 0;

  if (!transferUserName || !transterAmount) return;

  const currentAccountAmount = labelBalance.textContent.split(' ').at(0) - 0;

  if (transterAmount <= 0 || transterAmount > currentAccountAmount) return;

  const transferToUser = accounts.find(
    account => account.userName === transferUserName,
  );

  if (transferToUser.userName === currentAccount.userName) return;

  transferToUser.movements.push(transterAmount);
  currentAccount.movements.push(-transterAmount);

  clearInput(inputTransferTo, inputTransferAmount);

  calcAnyAmount(currentAccount);
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = inputLoanAmount.value - 0;

  if (!Number.isNaN(amount) && amount <= 0) return;

  currentAccount.movements.push(amount);

  clearInput(inputLoanAmount);

  calcAnyAmount(currentAccount);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const currentAccountIndex = accounts.findIndex(
    account => account.userName === currentAccount.userName,
  );

  const closeUserName = inputCloseUsername.value;
  const closeUserPin = inputClosePin.value - 0;
  console.log(closeUserPin, closeUserName);

  if (!closeUserName || !closeUserPin) return;

  const closeUserIndex = accounts.findIndex(
    account =>
      account.userName === closeUserName && account.pin === closeUserPin,
  );

  console.log(currentAccountIndex, closeUserIndex);
  if (closeUserIndex === -1 || currentAccountIndex === closeUserIndex) return;

  accounts.splice(closeUserIndex, 1);

  console.log(accounts);
  clearInput(inputCloseUsername, inputClosePin);
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  sorted = !sorted;

  displayMovements(currentAccount.movements, sorted);
});

handleUserName(accounts);

inputLoginUsername.value = 'js';
inputLoginPin.value = '1111';
