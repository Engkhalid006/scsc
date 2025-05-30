let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
const playerName = localStorage.getItem('playerName') || 'اللاعب';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('score').textContent = score;
    loadQuestion();
    startTimer();
});

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(index));
        optionsDiv.appendChild(optionElement);
    });
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    
    const correctIndex = questions[currentQuestion].correctAnswer;
    const options = document.querySelectorAll('.option');
    
    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add('correct');
        score += 10;
        timeLeft += 5;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[correctIndex].classList.add('correct');
        score -= 7;
        timeLeft -= 6;
        if (timeLeft < 0) timeLeft = 0;
    }
    
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length && timeLeft > 0) {
            loadQuestion();
            startTimer();
        } else {
            endGame();
        }
    }, 1500);
}

function startTimer() {
    document.getElementById('timer').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    alert(`انتهت اللعبة!\n${playerName}، نتيجتك النهائية هي: ${score}`);
    window.location.href = 'index.html';
}