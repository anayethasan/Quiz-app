const question = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: false},
            {text: "Elephant", correct: true},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the Smallest Country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bangladesh", correct: false},
            {text: "Nepal", correct: false},
            {text: "Srilanka", correct: false},
        ]

    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            {text: "China", correct: false},
            {text: "Thailand", correct: false},
            {text: "Japan", correct: true},
            {text: "Srilanka", correct: false},
        ]

    },
    {
        question: "Who was the first person to walk on the moon?",
        answers: [
            {text: "Buzz Aldrin", correct: false},
            {text: "Michael Collins", correct: false},
            {text: "Yuri Gagarin", correct: false},
            {text: "Neil Armstrong", correct: true},
        ]

    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Jupiter", correct: false},
            {text: "Mars", correct: true},
            {text: "Saturn", correct: false},
            {text: "Venus", correct: false},
        ]

    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQustionIndex = 0;
let score = 0;

function startQuiz(){
    currentQustionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQustion = question[currentQustionIndex];
    let questionNo = currentQustionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQustion.question;

    currentQustion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQustionIndex++;
    if(currentQustionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQustionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();