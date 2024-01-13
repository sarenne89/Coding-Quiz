const scoreList = document.querySelector("#highscores");
const clearButton = document.querySelector("#clear");
let scoreItemsArray = JSON.parse(localStorage.getItem("savedScoreItems") ?? []);

//Gets saved scores from local storage and puts each one in a new <li> 
function displayScores() {
    for (let i = 0; i < scoreItemsArray.length; i++) {
        let scoreElement = document.createElement("li");
        scoreElement.innerText = scoreItemsArray[i];
        scoreList.appendChild(scoreElement);
    }
};

//Clears all saved scores from local storage
function clearScores() {
    localStorage.removeItem("savedScoreItems");
    location.reload();
}

displayScores();
clearButton.addEventListener("click", clearScores)