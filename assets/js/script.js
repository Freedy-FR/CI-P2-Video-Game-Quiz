// Variables
let startButton = document.getElementById("btn-start");

let nameInput = document.getElementById("name");
let questionInput = document.getElementById("question");
let answerGrid = document.getElementById("btn-answer");
let answerButtons = document.getElementsByClassName("btn-option");
let nextButton = document.getElementById("btn-next");
let questionStatus = document.getElementById("status");
let nameStatus = document.getElementById("name-status");
let displayScore = document.getElementById("scoreCount");
let totalQuestions = document.getElementById("total-questions");
let displayQuestionNumber = document.getElementById("questionNumber");
let finalResultScore = document.getElementById("final-result");
let retryButton = document.getElementById("retry");

let correctAnswer;
let incorrectAnswer;

let currentScore = 0;
let questionAnswered = 1;
let numberOfQuestions = 11;

let mainPage = document.getElementById("main-page");
let gameArea = document.getElementById("game-area");
let resultPageArea = document.getElementById("results");

// DOM load
document.addEventListener("DOMContentLoaded", () => {
    displayScore.innerHTML = currentScore;
    totalQuestions.innerHTML = numberOfQuestions - 1;
    getData();
});


// Api url
let url = "https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=multiple";

/**
 * Api function to fetch an array of objects with questions and answer
 */
async function getData() {
    let response = await fetch(url);
    let data = await response.json();
    questionStatus.innerHTML = "";
    showQuestion(data.results[0]);
}


// Show Questions and answers function
function showQuestion(data) {
    nextButton.disabled = true;
    questionStatus.innerHTML = `<p>Please insert an Answer!!</p>`
    correctAnswer = data.correct_answer;
    incorrectAnswer = data.incorrect_answers;
    let questionsList = incorrectAnswer;
    questionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    questionInput.innerHTML = `<p>${data.question}</p>`;
    answerGrid.innerHTML = `
    ${questionsList.map((option, index) =>`
    <button class="btn-option btn">${index +1} - <span>${option}</span></button>
    `).join('')}
    `;
    console.log(correctAnswer);
    selectBtn();
}


// Button selector
function selectBtn() {
    answerGrid.querySelectorAll("button").forEach((option) => {
        option.addEventListener("click", () => {
            if (answerGrid.querySelector(".highlighted")) {
                let highlightedOption = answerGrid.querySelector(".highlighted");
                highlightedOption.classList.remove("highlighted");
            }
            option.classList.add("highlighted");
            questionStatus.innerHTML = "";
            nextButton.disabled = false;
        });
    });
}


// Next button and check answer
nextButton.addEventListener("click", checkAnswerNext);

function checkAnswerNext() {
    if (answerGrid.querySelector(".highlighted")) {
        let highlightedButton = answerGrid.querySelector(".highlighted span").textContent;
        console.log(highlightedButton);

        if (highlightedButton == HTMLtoString(correctAnswer)) {
            currentScore++;
            questionStatus.innerHTML = `<p> You got it right! <i class="fa-regular fa-circle-check"></i></p>`;
        } else {
            questionStatus.innerHTML = `<p> You got it wrong! <i class="fa-sharp fa-solid fa-circle-xmark"></i></p><br><p>Correct Answer: ${correctAnswer}</p>`;
        }
    }
    counterFunctions();
}

// Transform HTML into text strings
function HTMLtoString(textString) {
    let source = new DOMParser().parseFromString(textString, "text/html");
    return source.documentElement.textContent;
}

//  Question Counter and correct answer counter
function counterFunctions() {
    questionAnswered++;

    displayScore.innerHTML = currentScore;
    displayQuestionNumber.innerHTML = questionAnswered;

    if (questionAnswered == numberOfQuestions) {
        setTimeout(() => {
            alert("result");
            resultPage();
        }, 2);

    } else {
        disableOptionButtons();
        nextButton.disabled = true;
        setTimeout(() => {
            getData();
        }, 2);
    }
}


// Disable Answer buttons
function disableOptionButtons() {
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    }
}



// Start game function
startButton.addEventListener("click", startGame);

function startGame() {
    // if (nameInput.value == "") {
    //     nameStatus.innerHTML = `<p>Please insert your name to start game!</p>`;
    // } else {
    nameStatus.innerHTML = "";
    mainPage.classList.add("hide");
    gameArea.classList.remove("hide");
    showQuestion();
    // }
}


// Result Page function
function resultPage() {
    gameArea.classList.add("hide");
    resultPageArea.classList.remove("hide");
    finalResultScore.innerHTML = document.getElementById("score").innerHTML;
}


// Retry button function

retryButton.addEventListener("click", retryFunction);

function retryFunction() {

    resultPageArea.classList.add("hide");
    resetGame();
    startGame();
}

// Reset counters and displays function
function resetGame() {
    currentScore = 0;
    questionAnswered = 1;
    numberOfQuestions = 11;
    displayScore.innerHTML = currentScore;
    totalQuestions.innerHTML = numberOfQuestions - 1;
    displayQuestionNumber.innerHTML = questionAnswered;
}