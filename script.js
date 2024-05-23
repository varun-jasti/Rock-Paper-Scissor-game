let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
// document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
updateScoreElement();
function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
  localStorage.removeItem('score');
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}
let isAutoplaying = false;
let intervalId;

// const autoPlay = ()=>{



// }

function autoPlay(){
  if(!isAutoplaying){
    intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
  
    },1000);
    isAutoplaying=true; 
  }
  else{
    clearInterval(intervalId);
    isAutoplaying = false;

  }

  }

document.querySelector('.js-rock-btn')
  .addEventListener('click',()=>{
    playGame('rock')
  })

document.querySelector('.js-paper-btn')
  .addEventListener('click',()=>{
    playGame('paper')
  })

document.querySelector('.js-scissors-btn')
  .addEventListener('click',()=>{
    playGame('scissors')
  })





document.body.addEventListener('keydown',(event)=>{
  if (event.key==='r'){
    playGame('rock')
  }else if(event.key==='p'){
    playGame('paper')

  }else if(event.key==='s'){
    playGame('scissors')
  }
})



  

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img class = "move-icon" src="${playerMove}-emoji.png">

<img  class = "move-icon" src="${computerMove}-emoji.png">
Computer`


//       alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}