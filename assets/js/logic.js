const startButton = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen")
const timer = document.querySelector("#time");
const questionsContainer = document.querySelector("#questions");
const question = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const submitButton = document.querySelector("#submit");
const initials = document.querySelector("#initials");
const feedback = document.querySelector("#feedback");
let questionTracker = 0;
let currentScore = 0;
var timeLeft = 100

function startTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timeLeft--;
      timer.textContent = timeLeft;
      if(timeLeft === 0) {
        clearInterval(timerInterval);
        endScreen.classList.toggle("hide");
        questionsContainer.classList.toggle("hide");
      }
    }, 1000);
  }

function startGame() {
    startTimer();
    timer.textContent = timeLeft;
    startButton.classList.toggle("hide");
    startScreen.classList.toggle("hide");
    questionsContainer.classList.toggle("hide")
    question.textContent = questionList[0].question
};

startButton.addEventListener("click", startGame);