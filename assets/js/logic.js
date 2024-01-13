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
let selectedAnswer = "";

function startTimer() {
    var timerInterval = setInterval(function() {
      timeLeft--;
      timer.textContent = timeLeft;
      if(timeLeft === 0 || questionTracker === questionList.length) {
        clearInterval(timerInterval);
        endScreen.classList.remove("hide");
        questionsContainer.classList.add("hide");
      }
    }, 1000);
  }

function startGame() {
    startTimer();
    timer.textContent = timeLeft;
    startButton.classList.add("hide");
    startScreen.classList.add("hide");
    questionsContainer.classList.remove("hide")
    getNextQuestion();
};

function getNextQuestion() {
    question.textContent = questionList[questionTracker].question;
    for (let i = 0; i < questionList[questionTracker].choices.length; i++) {
        var choicesButton = document.createElement('input');
        choicesButton.type = 'button';
        choicesButton.value = questionList[questionTracker].choices[i];
        choicesButton.id = "choice" + [i];
        choicesButton.addEventListener("click", checkAnswer)
        choicesButton.classList.add("choicesButton");
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

function checkAnswer(e) {
    const selectedAnswer = e.target;
    if (JSON.parse(selectedAnswer.dataset.answer) === true) {
        currentScore += 100;
        questionTracker ++;
        hidePreviousAnswers();
        if (questionTracker >= questionList.length) {
            showEndScreen();
            }
        else {getNextQuestion()};
    }
    else {timeLeft -= 10};
    
};
    
function showEndScreen() {   
    endScreen.classList.remove("hide");
    questionsContainer.classList.add("hide");
    let highScore = currentScore + timeLeft;
    finalScore.append(highScore)
};

function hidePreviousAnswers() {
    var answerButtons = document.getElementsByClassName('choicesButton');
    for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].classList.add("hide");
    };
};  

startButton.addEventListener("click", startGame);