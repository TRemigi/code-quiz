var viewScoresEl = document.getElementById("high-scores");
var mainEl = document.getElementById("main");
var questionEl = document.getElementById("big-text");
var choiceListEl = document.getElementById("btn-list");
var startBtnEl = document.getElementById("start");
var pageEl = document.querySelector("body");
var instructionsEl = document.getElementById("instructions-text");
var textWrapperEl = document.getElementById("text-wrap");
var timerCount = 75;
var timerEl = document.getElementById("timer-span");
timerEl.textContent = timerCount;
var timerDisplayEl = document.getElementById("timer");
var feedbackTextEl = document.getElementById("alert-text");
var questionSet = -1;

var highScoresArr = [];

var questionsObj = [{
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to a variable.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
];

var questionHandler = function () {

    if (questionSet === -1) {
        timerEl.textContent = timerCount;
        instructionsEl.style.display = "none";
        startBtnEl.style.display = "none";
        var listContainerEl = document.getElementById("btn-list-container");
        listContainerEl.style.justifyContent = "flex-start";
    }

    questionSet++;
    console.log(questionSet);

    if (questionSet < 5) {
        var userQuestion = questionsObj[questionSet].question;
        questionEl.textContent = userQuestion;
        questionEl.style.textAlign = "left";

        // run function to create and append answer buttons
        choicesHandler(questionSet);
        console.log(questionSet);
    }
    if (questionSet === 5) {
        endGame();
    }
};

// funtion to create and append answer buttons
var choicesHandler = function (questionSet) {

    // remove any existing choices
    while (choiceListEl.hasChildNodes()) {
        choiceListEl.removeChild(choiceListEl.firstChild);
    }

    for (i = 0; i < questionsObj[questionSet].choices.length; i++) {

        var answerListItemEl = document.createElement("li");
        answerListItemEl.className = "btn-li";
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "answer-btn";
        var choiceContent = questionsObj[questionSet].choices[i];
        answerBtnEl.textContent = choiceContent;
        // check to see if choice has same value as answer
        if (choiceContent === questionsObj[questionSet].answer) {
            answerBtnEl.setAttribute("data-check", "correct");
        } else {
            answerBtnEl.setAttribute("data-check", "incorrect");
        }
        // append button to list item and list item to list
        answerListItemEl.appendChild(answerBtnEl);
        choiceListEl.appendChild(answerListItemEl);
    }
};

var answerChecker = function (event) {

    var targetEl = event.target;
    //check answer if click was NOT on start button
    if (targetEl.id !== "start") {
        var dataCheckValue = targetEl.getAttribute("data-check");

        //check for incorrect answer and subtract time
        if (dataCheckValue !== "correct") {
            timerCount = timerCount - 10;
            timerEl.textContent = timerCount;

            // check for and remove old feedback
            // var feedback1 = document.querySelector("#alert-text-container");
            var feedback1 = document.querySelector("#feedback-text");
            var feedback2 = document.querySelector("#alert-text-container");
            feedbackChecker(feedback1, feedback2);

            // create new feedback elements
            var alertContainerEl = document.createElement("div");
            alertContainerEl.id = "alert-text-container";
            var feedbackTextEl = document.createElement("h2");
            feedbackTextEl.className = "alert-text";
            feedbackTextEl.id = "feedback-text";
            feedbackTextEl.textContent = "Wrong!";
            alertContainerEl.appendChild(feedbackTextEl);
            mainEl.appendChild(alertContainerEl);

            // return to questionHandler
            questionHandler();

        } else {
            // check for and remove old feedback
            var feedback1 = document.querySelector("#feedback-text");
            var feedback2 = document.querySelector("#alert-text-container");
            feedbackChecker(feedback1, feedback2);

            // create new feedback elements
            var alertContainerEl = document.createElement("div");
            alertContainerEl.id = "alert-text-container";
            var feedbackTextEl = document.createElement("h2");
            feedbackTextEl.className = "alert-text";
            feedbackTextEl.id = "feedback-text";
            feedbackTextEl.textContent = "Correct!";
            alertContainerEl.appendChild(feedbackTextEl);
            mainEl.appendChild(alertContainerEl);

            // return to questionHandler
            questionHandler();
        }
    }
};

var endGame = function () {
    // remove answers
    while (choiceListEl.hasChildNodes()) {
        choiceListEl.removeChild(choiceListEl.firstChild);
    }
    // let user know quiz is over and display score
    questionEl.textContent = "All done!";
    var scoreDisplayEl = document.createElement("h2");
    scoreDisplayEl.id = "score-message";
    scoreDisplayEl.textContent = "Your final Score is " + timerCount + ".";
    scoreDisplayEl.className = "second-text";
    scoreDisplayEl.style.textAlign = "left";
    textWrapperEl.appendChild(scoreDisplayEl);

    // create form wrapper
    var formWrapperEl = document.createElement("div");
    formWrapperEl.id = "form-wrapper";
    // create form
    var scoreFormEl = document.createElement("form");
    scoreFormEl.className = "score-form";
    // create form input label
    var formLabelEl = document.createElement("label");
    formLabelEl.id = "input-label";
    formLabelEl.for = "#initials-input";
    formLabelEl.textContent = "Enter Initials:"
    // create form input
    var formInputEl = document.createElement("input");
    formInputEl.type = "text";
    formInputEl.name = "initials";
    formInputEl.id = "initials-input";
    // create form submit button
    var formSubmitEl = document.createElement("input");
    formSubmitEl.id = "form-submit";
    formSubmitEl.type = "submit";
    formSubmitEl.value = "Submit";
    //append form elements
    scoreFormEl.appendChild(formLabelEl);
    scoreFormEl.appendChild(formInputEl);
    scoreFormEl.appendChild(formSubmitEl);
    formWrapperEl.appendChild(scoreFormEl);
    textWrapperEl.appendChild(formWrapperEl);

    // run saveScore function upon submit
    formSubmitEl.addEventListener("click", saveScore);
}

var feedbackChecker = function (feedback1, feedback2) {
    if (feedback1) {
        feedback1.remove();
    }
    if (feedback2) {
        feedback2.remove();
    }
};

var saveScore = function (event) {
    event.preventDefault();
    // capture user initials
    var userInitials = document.querySelector("input[name='initials']").value;
    // capture user score
    var userScore = timerCount;

    if (!userInitials) {
        window.alert("You must enter your initials");
        return;

    } else {
        var userScoreObj = {
            name: userInitials,
            score: userScore
        };

        if (!highScoresArr) {
            highScoresArr = [];
        }

        // send new object to highScores Array
        highScoresArr.push(userScoreObj);
        console.log(highScoresArr);

        // save highScores array to localStorage
        localStorage.setItem("highScores", JSON.stringify(highScoresArr));

        loadScores();
        displayScores();
    }
};

var loadScores = function (event) {
    highScoresArr = localStorage.getItem("highScores");

    highScoresArr = JSON.parse(highScoresArr);

    if (highScoresArr) {
        // sort array by score
        var compare = function (a, b) {
            const scoreA = a.score;
            const scoreB = b.score;

            var comparison = 0;
            if (scoreA > scoreB) {
                comparison = -1;
            } else if (scoreA < scoreB) {
                comparison = 1;
            }
            return comparison;
        }

        highScoresArr.sort(compare);

    }
    console.log(highScoresArr);
}

var displayScores = function () {
    if (!highScoresArr) {
        window.alert("There are no high scores yet!");
        return;
    }

    var hasForm = document.getElementById("form-wrapper");
    var hasStart = document.getElementById("start");

    // check if coming from form submit
    if (hasForm) {
        var scoreFormWrapper = document.getElementById("form-wrapper");
        var scoreDisplayEl = document.getElementById("score-message");
        scoreDisplayEl.remove();
        while (scoreFormWrapper.hasChildNodes()) {
            scoreFormWrapper.removeChild(scoreFormWrapper.firstChild);
        }
        scoreFormWrapper.remove();
        var feedbackTextEl = document.getElementById("feedback-text");
        feedbackTextEl.remove();
    }

    // check if coming from vewScores click
    if (hasStart) {
        var startButtonEl = document.getElementById("start");
        startButtonEl.remove();
        var instructionsEl = document.getElementById("instructions-text");
        instructionsEl.remove();
    }

    // remove button list container and alert container
    var buttonListEl = document.getElementById("btn-list-container");
    buttonListEl.remove();
    var alertContainerEl = document.getElementById("alert-text-container");
    alertContainerEl.remove();


    // change main text
    questionEl.textContent = "High Scores";
    mainEl.style.justifyContent = "flex-start";

    writeScores();

    // create back and clear buttons
    var buttonDivEl = document.createElement("div");
    buttonDivEl.id = "scores-buttons-container";
    var backButtonEl = document.createElement("button")
    backButtonEl.id = "back-button";
    backButtonEl.className = "score-buttons";
    backButtonEl.textContent = "Go back";
    var clearButtonEl = document.createElement("button");
    clearButtonEl.id = "clear-button";
    clearButtonEl.className = "score-buttons";
    clearButtonEl.textContent = "Clear High Scores";
    buttonDivEl.appendChild(backButtonEl);
    buttonDivEl.appendChild(clearButtonEl);
    mainEl.appendChild(buttonDivEl);

    // hide viewScores button and timer
    viewScoresEl.style.display = "none";
    timerDisplayEl.style.display = "none";


    clearButtonEl.addEventListener("click", clearScores);
    backButtonEl.addEventListener("click", reset);
}

var clearScores = function (event) {
    localStorage.clear();
    var scoreListWrapperEl = document.getElementById("score-list-wrapper");
    console.log(scoreListWrapperEl);
    while (scoreListWrapperEl.hasChildNodes()) {
        scoreListWrapperEl.removeChild(scoreListWrapperEl.firstChild);
    }
    scoreListWrapperEl.remove();
}

var writeScores = function () {
    var scoreListWrapperEl = document.createElement("div");
    scoreListWrapperEl.id = "score-list-wrapper";
    var scoreListEl = document.createElement("ul");
    scoreListEl.id = "score-list";

    for (i = 0; i < highScoresArr.length; i++) {
        var userInitials = highScoresArr[i].name;
        var userScore = highScoresArr[i].score;
        var scoreListItemEl = document.createElement("li");
        scoreListItemEl.id = "score-list-item";
        var scoreEntryNumber = i + 1;
        scoreListItemEl.textContent = scoreEntryNumber + ". " + userInitials + " - " + userScore;
        scoreListEl.appendChild(scoreListItemEl);
    }
    scoreListWrapperEl.appendChild(scoreListEl);
    mainEl.appendChild(scoreListWrapperEl);
}

var reset = function () {
    
}

loadScores();
startBtnEl.addEventListener("click", questionHandler);
choiceListEl.addEventListener("click", answerChecker);
viewScoresEl.addEventListener("click", displayScores);