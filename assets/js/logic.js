const startButton = document.querySelector("#start");
const startScreen = document.querySelector("#start-screen");
const timer = document.querySelector("#time");
const questionsContainer = document.querySelector("#questions");
const question = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const submitButton = document.querySelector("#submit");
const initials = document.querySelector("#initials");
const feedback = document.querySelector("#feedback");
const feedbackText = document.querySelector("#feedbackText");
let questionTracker = 0;
let currentScore = 0;
let timeLeft = 60;
let selectedAnswer = "";
let highScore = "";

//Starts the game timer, hides the start screen and button and shows the div containing questions.
function startGame() {
  startTimer();
  timer.textContent = timeLeft;
  startButton.classList.add("hide");
  startScreen.classList.add("hide");
  questionsContainer.classList.remove("hide");
  getNextQuestion();
}

//Sets timer to count down from 60 seconds. After the timer expires, the end screen is shown and the div containing questions is hidden.
function startTimer() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0 || questionTracker === questionList.length) {
      clearInterval(timerInterval);
      endScreen.classList.remove("hide");
      questionsContainer.classList.add("hide");
    }
  }, 1000);
}

//Populates the div containing questions with the next question in the list, according to the order set in the questions array in questions.js.
//It also creates a button for each of the available answers in questions.js.
//If there is a button containing a value equal to what is set as the correct answer in questions.js, it is given the property data-answer="true".
//Else, it receives data-answer="false"
function getNextQuestion() {
  question.textContent = questionList[questionTracker].question;
  for (let i = 0; i < questionList[questionTracker].choices.length; i++) {
    var choicesButton = document.createElement("input");
    choicesButton.type = "button";
    choicesButton.value = questionList[questionTracker].choices[i];
    choicesButton.id = "choice" + [i];
    choicesButton.addEventListener("click", checkAnswer);
    choicesButton.classList.add("choicesButton");
    if (
      questionList[questionTracker].choices[i] ===
      questionList[questionTracker].answer
    ) {
      choicesButton.dataset.answer = true;
    } else {
      choicesButton.dataset.answer = false;
    }
    choices.appendChild(choicesButton);
  }
}

//Function for playing a sound when clicking a correct answer.
function playCorrect() {
  let correct = new Audio("assets/sfx/correct.wav");
  correct.play();
}

//Function for playing a sound when clicking an incorrect answer.
function playIncorrect() {
  let incorrect = new Audio("assets/sfx/incorrect.wav");
  incorrect.play();
}

//This functions checks to see if the button clicked has data-answer set to "true" or "false". It then proceeds depending on the outcome.
//If the answer is correct, a sound is played, score is increased by 100 and the question tracker is increased to tell the app to get the next question, hiding the current one.
//If the answer is incorrect, a sound is played, and 10 seconds are removed from the timer.
function checkAnswer(e) {
  const selectedAnswer = e.target;
  if (JSON.parse(selectedAnswer.dataset.answer) === true) {
    playCorrect();
    currentScore += 100;
    questionTracker++;
    giveCorrectFeedback();
    hidePreviousAnswers();
    if (questionTracker >= questionList.length) {
      showEndScreen();
    } else {
      getNextQuestion();
    }
  } else {
    playIncorrect();
    giveIncorrectFeedback();
    timeLeft -= 10;
  }
}

//This function hides previously created answer buttons once the next question has been shown.
function hidePreviousAnswers() {
  let answerButtons = document.getElementsByClassName("choicesButton");
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].classList.add("hide");
  }
}

//This function shows the end screen and calculates the players final score, equal to the number of points scored plus the remaining time on the timer.
//The div containing questions is also hidden from view with the "hide" class.
function showEndScreen() {
  endScreen.classList.remove("hide");
  questionsContainer.classList.add("hide");
  let highScore = currentScore + timeLeft;
  finalScore.append(highScore);
}

//This function combines the player-entered initials from the end screen to their final score, so that it can be added to an array in local storage.
//This can later be added to the highscore page.
function pushScoreItem() {
  let currentScoreItem =
    initials.value.toUpperCase() + " " + finalScore.innerText;
  let listOfScores = JSON.parse(localStorage.getItem("scoreItemsString")) ?? [];
  listOfScores.push(currentScoreItem);
  localStorage.setItem("savedScoreItems", JSON.stringify(listOfScores));
}

//This function gives text feedback to the player when they choose an incorrect answer.
function giveIncorrectFeedback() {
  feedbackText.innerText = "Try Again!!!";
  showFeedback();
}

//This function gives text feedback when the player chooses the correct answer.
function giveCorrectFeedback() {
  feedbackText.innerText = "Correct!!!";
  showFeedback();
}

//This is the function that will show the feedback section of the HTML page for 1 seconds when they choose an answer.
function showFeedback() {
  feedback.classList.remove("hide");
  let showFeedbackTimer = 1;
  let feedbackTimerInterval = setInterval(function () {
    showFeedbackTimer--;
    if (showFeedbackTimer === 0) {
      clearInterval(feedbackTimerInterval);
      feedback.classList.add("hide");
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", pushScoreItem);
