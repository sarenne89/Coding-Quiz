const scoreList = document.querySelector("#highscores");
const clearButton = document.querySelector("#clear");
let scoreItemsArray = JSON.parse(localStorage.getItem("savedScoreItems") ?? []);

function displayScores() {
    for (let i = 0; i < scoreItemsArray.length; i++) {
        let scoreElement = document.createElement("li");
        scoreElement.innerText = scoreItemsArray[i];
        scoreList.appendChild(scoreElement);
    }
};

function clearScores() {
    localStorage.removeItem("savedScoreItems");
    location.reload();
}

displayScores();

clearButton.addEventListener("click", clearScores)