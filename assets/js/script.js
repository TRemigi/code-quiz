var questionEl = document.getElementById("big-text");
var choiceListEl = document.getElementById("btn-list");
var startBtnEl = document.getElementById("start");
var pageEl = document.querySelector("body");
var instructionsEl = document.getElementById("instructions-text");

var questionsObj = [
    {
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
        question: "String values must be enclosed within _____ when being assigned to variable.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
];

console.log(questionEl);

var questionHandler = function() {

    instructionsEl.remove();
    startBtnEl.remove();

    for (i = 0; i < questionsObj.length; i++) {
        var userQuestion = questionsObj[i].question;
        questionEl.textContent = userQuestion;
        var questionSet = questionsObj[i];

        // run function to create and append answer buttons
        choicesHandler(questionSet);

    }
}

var choicesHandler = function(questionSet) {

    for (i =0; i < questionsObj[i].choices.length; i++) {

        var answerListItemEl = document.createElement("li");
        answerListItemEl.className="btn-li";
        var answerBtnEl = document.createElement("button");
        answerBtnEl.textContent = questionSet.choices[i];
        // append button to list item and list item to list
        answerListItemEl.appendChild(answerBtnEl);
        choiceListEl.appendChild(answerListItemEl);
    }
}

startBtnEl.addEventListener("click", questionHandler);


