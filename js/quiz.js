// IMPORT QUESTIONS
import { quizQuestions } from './quiz-questions.js';

// DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");

const quizScreen = document.getElementById("quiz-screen");
const currentQuestionText = document.getElementById("current-question-text");
const currentQuestionNum = document.querySelector('[data-attr="current-question-number"]');
const totalQuestionElements = document.querySelectorAll('[data-attr="total-questions"]');
const overallScore = document.querySelector('[data-attr="score"]');
const questionCategory = document.querySelector('[data-attr="question-category"]');
const answerGroup = document.querySelector('[data-attr="multiple-choice-answers"]');
const progressBar = document.querySelector('[data-attr="progress"]');
const stopButton = document.getElementById("stop-btn");

const resultsScreen = document.getElementById("result-screen");
const finalScore = document.querySelector('[data-attr="final-score"]');
const completedQuestions = document.querySelector('[data-attr="completed-questions"]');
const resultMessage = document.querySelector('[data-attr="result-message"]');
const restartButton = document.getElementById("restart-btn");

const questionCount = quizQuestions.length;

// QUIZ STAT VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionElements.forEach(el => {
    el.textContent = questionCount;
});
completedQuestions.textContent = questionCount;


// EVENT LISTENERS
startButton.addEventListener("click", startQuiz);
stopButton.addEventListener("click", stopQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // RESET VARIABLES
    currentQuestionIndex = 0;
    score = 0;
    overallScore.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() { 
    // RESET STATE
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionNum.textContent = currentQuestionIndex + 1;

    currentQuestionText.textContent = currentQuestion.question;
    questionCategory.textContent = currentQuestion.catergory;

    const progressPercent = (currentQuestionIndex / questionCount) * 100;
    progressBar.style.width = progressPercent + "%";

    answerGroup.innerHTML = "";

    currentQuestion.answers.forEach((answer) => { 
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        
        // Dataset to store custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);
        
        answerGroup.appendChild(button);
    });
}

function selectAnswer(event) {
    // OPTIMIZATION CHECK
    if (answersDisabled) return;
    
    answersDisabled = true;
    
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    Array.from(answerGroup.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) { 
        score++;
        overallScore.textContent = score;
    }
    
    setTimeout(() => { 
        currentQuestionIndex++;
        
        // Check if there are more questions or if the quiz is over
        if (currentQuestionIndex < questionCount) { 
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultsScreen.classList.add("active");

    finalScore.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}






function stopQuiz() {
    // RESET VARIABLES
    // currentQuestionIndex = 0;
    // score = 0;
    // overallScore.textContent = 0;

    quizScreen.classList.remove("active");
    resultsScreen.classList.add("active");

    // showResults();
}

function restartQuiz() {
    resultsScreen.classList.remove("active");

    startQuiz();
}