const questions = [
    {
        question: "Who is the CEO of tesla?",
        answers: [
            {text:"Jeff Bezoz",correct: false},
            {text:"Mark Zuckerberg",correct: false},
            {text:"Tim Cook",correct: false},
            {text:"Elon Musk",correct: true},
        ]
    },
    {
        question:"In what year was the United Nations founded?",
        answers:[
            {text:"1920",correct: false},
            {text:"1945",correct: true},
            {text:"1950",correct: false},
            {text:"1935",correct: false},
        ]
    },
    {
        question:"Who came up with the theory of relativity?",
        answers:[
            {text:"Edgar Allan Poe",correct: false},
            {text:"Albert Einstein",correct: true},
            {text:"Galileo Galilei",correct: false},
            {text:"Louis Pasteur",correct: false},
        ]
    },
    {
        question:"Who discovered electricity?",
        answers:[
            {text:"Isaac Newton",correct: false},
            {text:"Nikola Tesla",correct: false},
            {text:"Michael Faraday",correct: false},
            {text:"Benjamin franklin",correct: true},
        ]
    },
    {
        question:"Which planet is known as the Red Plane?",
        answers:[
            {text:"Venus",correct: false},
            {text:"Mars",correct: true},
            {text:"jupiter",correct: false},
            {text:"Saturn",correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
          if (answer.correct) {
            button.dataset.correct = answer.correct;
          }
        button.addEventListener("click",selectAnswer);

    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
          button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score}out of ${questions.length}|.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
