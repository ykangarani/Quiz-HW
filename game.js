const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelectorAll('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'JavaScript is a ___ -side programming language.',
        choice1: 'Client',
        choice2: 'Server',
        choice3: 'Both',
        choice4: 'None',
        answer: 3,
    },
    {
        question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
        choice1: 'alertBox(“Hello DataFlair!”);',
        choice2: 'alert(Hello DataFlair!);',
        choice3: 'msgAlert(“Hello DataFlair!”);',
        choice4: 'alert(“Hello DataFlair!”);',
        answer: 4,
    },
    {
        question: "How do you find the minimum of x and y using JavaScript?",
        choice1: 'min(x,y);',
        choice2: 'Math.min(x,y)',
        choice3: 'Math.min(xy)',
        choice4: 'min(xy);',
        answer: 2,
    },
    {
        question: "What will the code return? Boolean(3 < 7)",
        choice1: 'true',
        choice2: 'false',
        choice3: 'NaN',
        choice4: 'SyntaxError',
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    c = 60
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply == 'incorrect') {
            c = c - 15;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

function timer() {
    c = c - 1;
    if (c < 60) {
        time.innerHTML = c;
    }
    if (c < 1) {
        window.clearInterval(update);
        return window.location.assign('end.html')
    }
}

update = setInterval("timer()", 1000);

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()