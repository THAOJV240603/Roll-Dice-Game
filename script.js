'use strict';

// Luật chơi:
// Người chơi sẽ tung một viên xúc xắc. Con số từ viên xúc xắc được cộng vào điểm số hiện tại của người chơi, ngay tại CURRENT
// Người chơi có thể tung xúc xắc một lần nữa nếu muốn, người chơi có thể chọn giữ số điểm này bằng cách nhấn vào nút HOLD.
// Số điểm này sẽ được cộng vào tổng điểm của người chơi, tại vị trí PLAYER và hệ thống chuyển sang lượt chơi của người còn lại
// Bất cứ khi nào người chơi tung được 1, người chơi sẽ mất tất cả số điểm hiện tại (tại vị trí CURRENT) và sau đó chuyển sang lượt chơi của người còn lại.
// Đó là lý do tại sao đôi khi người chơi cần HOLD điểm lại
// Người chơi nào đạt được 100 điểm đầu tiên sẽ giành chiến thắng.
// Khi nhấp vào nút NEW GAME này, viên xúc xắc sẽ biến mất và tất cả các điểm được đặt trở lại 0

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
