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

function displayMovements(movements = []) {
  containerMovements.textContent = '';

  const movementsHtml = movements.reduce((result, move, index) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const htmlTemplate = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${move} €</div>
    </div>
    `;

    return result + htmlTemplate;
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

  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();

  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount.movements);
  calcDisplaySummaryIn(currentAccount.movements);
  calcDisplaySummaryOut(currentAccount.movements);
  calcDisplaySummaryInterest(currentAccount);
});

handleUserName(accounts);
