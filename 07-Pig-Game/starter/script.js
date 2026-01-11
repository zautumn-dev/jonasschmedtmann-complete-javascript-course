'use strict';

let currentPlayerNumber = 0; // 0 or 1
let diceNumber = 1;
const rollScores = [0, 0];

const scores = [0, 0];

const diceImgEl = document.querySelector('img.dice');
const newBtnEl = document.querySelector('button.btn--new');
const rollBtnEl = document.querySelector('button.btn--roll');
const holdBtnEl = document.querySelector('button.btn--hold');

const playerEls = document.querySelectorAll('section.player');
const scoreEls = document.querySelectorAll('p.score');
const currentScoreEls = document.querySelectorAll('p.current-score');

newBtnEl.addEventListener('click', newGames);
rollBtnEl.addEventListener('click', rollDice);
holdBtnEl.addEventListener('click', addScore);

function newGames() {
  scores.forEach((score, index) => {
    // 清空角色成绩 局部变量
    // score = 0;

    scores[index] = 0;
    scoreEls[index].textContent = 0;
    currentScoreEls[index].textContent = 0;

    // if (index === 0) playerEls[index].classList.add('player--active');
    // if (index === 1) playerEls[index].classList.remove('player--active');

    playerEls[index].classList[index ? 'remove' : 'add']('player--active');
  });

  currentPlayerNumber = 0;

  console.log(scores);
}

function rollDice() {
  const number = Math.trunc(Math.random() * 6) + 1;
  //   console.log('currentRollNumber -> ', number);
  diceNumber = number;
  diceImgEl.src = `dice-${number}.png`;

  if (number === 1) {
    addRollScore(0);
    togglePlayer();
    return;
  }
  addRollScore(number);
}

function addRollScore(number) {
  if (!number) {
    rollScores[currentPlayerNumber] = number;
  } else {
    rollScores[currentPlayerNumber] += number;
  }

  currentScoreEls[currentPlayerNumber].textContent =
    rollScores[currentPlayerNumber];
}

function addScore() {
  console.log(scores[currentPlayerNumber]);
  scores[currentPlayerNumber] += rollScores[currentPlayerNumber];
  scoreEls[currentPlayerNumber].textContent = scores[currentPlayerNumber];

  if (win()) return;
  addRollScore(0);
  togglePlayer();
}

function win() {
  if (scores[currentPlayerNumber] >= 10) {
    // alert(`玩家${currentPlayerNumber ? '二' : '一'}, 你胜利了!`);
    console.log(`玩家${currentPlayerNumber ? '二' : '一'}, 你胜利了!`);
    return true;
  }

  return false;
}

function togglePlayer() {
  currentPlayerNumber = Number(!currentPlayerNumber);

  playerEls.forEach(el => {
    el.classList.toggle('player--active');
  });
}

newGames();
