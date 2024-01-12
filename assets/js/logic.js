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
let timeLeft = 60;
let chosenAnswer = "";

function startTimer() {
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
    getNextQuestion();
};

function getNextQuestion() {
    question.textContent = questionList[questionTracker].question;
    for (let i = 0; i < questionList[questionTracker].choices.length; i++) {
        var choicesButton = document.createElement('input');
        choicesButton.type = 'button';
        choicesButton.value = questionList[questionTracker].choices[i];
        choicesButton.id = "elem" + [i];
        
        choicesButton.classList.add("choicesButton");
        choicesButton.addEventListener("click", checkAnswer());
        if (questionList[questionTracker].choices[i] === questionList[questionTracker].answer) 
        {
            choicesButton.dataset.answer = true;
        }
        else {
            choicesButton.dataset.answer = false;
        }
        choices.appendChild(choicesButton);
    }
};

function checkAnswer() {
    console.log("Hello there!");
}

startButton.addEventListener("click", startGame);