'use strict';

let number = randomNumber();
let scoreNumber = 20;

const numberDiv = document.querySelector('div.number');
const againBtn = document.querySelector('button.btn.again');
const checkBtn = document.querySelector('button.btn.check');
const guessInput = document.querySelector('input.guess');
const messageP = document.querySelector('p.message');
const scoreSpan = document.querySelector('span.score');
const highScoreSpan = document.querySelector('span.highscore');

againBtn && againBtn.addEventListener('click', registerNumber);
checkBtn && checkBtn.addEventListener('click', handleCheckNumber);

function randomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function registerNumber() {
  number = randomNumber();

  numberDiv.textContent = '?';
  messageP.textContent = 'Start guessing...';
  guessInput.value = '';
  scoreSpan.textContent = scoreNumber = 20;
  numberDiv.style.width = '15rem';

  document.body.style.backgroundColor = '#222';
}

function fractionDecrease() {
  scoreSpan.textContent = --scoreNumber;
}

function handleCheckNumber() {
  const guessNumber = guessInput.value;
  let message = '猜对了!你真棒';
  if (!guessNumber && guessNumber !== 0) {
    message = '没有输入数字!';
  } else if (guessNumber < number) {
    message = '猜小了';
    fractionDecrease();
  } else if (guessNumber > number) {
    message = '猜大了';
    fractionDecrease();
  } else {
    numberDiv.textContent = number;
    numberDiv.style.width = '30rem';
    document.body.style.backgroundColor = '#60b347';

    const highScoreNumber = highScoreSpan.textContent;
    highScoreSpan.textContent =
      scoreNumber > highScoreNumber ? scoreNumber : highScoreNumber;
  }
  messageP.textContent = message;
}
