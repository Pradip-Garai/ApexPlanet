document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreElement = document.getElementById('score');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const timerElement = document.getElementById('timer');
    const resultsElement = document.getElementById('results');
    const finalScoreElement = document.getElementById('final-score');
    const maxScoreElement = document.getElementById('max-score');
    const resultsMessageElement = document.getElementById('results-message');
    const resultsEmojiElement = document.getElementById('results-emoji');
    const progressFillElement = document.getElementById('progress');

    // Quiz variables
    let shuffledQuestions, currentQuestionIndex, score, timer, timeLeft;

    // Quiz questions
    const questions = [
        {
            question: 'What is the capital of France?',
            answers: [
                { text: 'London', correct: false },
                { text: 'Paris', correct: true },
                { text: 'Berlin', correct: false },
                { text: 'Madrid', correct: false }
            ]
        },
        {
            question: 'Which planet is known as the Red Planet?',
            answers: [
                { text: 'Venus', correct: false },
                { text: 'Mars', correct: true },
                { text: 'Jupiter', correct: false },
                { text: 'Saturn', correct: false }
            ]
        },
        {
            question: 'What is the largest mammal in the world?',
            answers: [
                { text: 'Elephant', correct: false },
                { text: 'Blue Whale', correct: true },
                { text: 'Giraffe', correct: false },
                { text: 'Polar Bear', correct: false }
            ]
        },
        {
            question: 'Which language runs in a web browser?',
            answers: [
                { text: 'Java', correct: false },
                { text: 'C', correct: false },
                { text: 'Python', correct: false },
                { text: 'JavaScript', correct: true }
            ]
        },
        {
            question: 'What year was JavaScript launched?',
            answers: [
                { text: '1996', correct: false },
                { text: '1995', correct: true },
                { text: '1994', correct: false },
                { text: 'None of the above', correct: false }
            ]
        }
    ];

    // Constants
    const QUESTION_TIME = 30; // 30 seconds per question

    // Initialize the quiz
    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        totalQuestionsElement.textContent = shuffledQuestions.length;
        scoreElement.textContent = score;
        
        startButton.classList.add('hide');
        nextButton.classList.add('hide');
        restartButton.classList.add('hide');
        resultsElement.classList.add('hide');
        
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer();
    }

    // Display the current question
    function showQuestion(question) {
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        questionElement.textContent = question.question;
        
        // Clear previous answer buttons
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        
        // Create new answer buttons
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('answer-btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    // Start the timer for the current question
    function startTimer() {
        timeLeft = QUESTION_TIME;
        timerElement.textContent = timeLeft;
        updateProgressBar();
        
        // Clear any existing timer
        if (timer) {
            clearInterval(timer);
        }
        
        // Start new timer
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            updateProgressBar();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 1000);
    }

    // Update the progress bar
    function updateProgressBar() {
        const progressPercent = (timeLeft / QUESTION_TIME) * 100;
        progressFillElement.style.width = `${progressPercent}%`;
        
        // Change color based on time left
        if (timeLeft <= 10) {
            progressFillElement.style.background = 'linear-gradient(to right, #f44336, #e53935)';
        } else if (timeLeft <= 20) {
            progressFillElement.style.background = 'linear-gradient(to right, #ff9800, #fb8c00)';
        } else {
            progressFillElement.style.background = 'linear-gradient(to right, var(--accent-color), var(--primary-color))';
        }
    }

    // Handle when time runs out
    function handleTimeOut() {
        // Disable all answer buttons
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });
        
        // If it's the last question, show results
        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            setTimeout(showResults, 1000);
        } else {
            nextButton.classList.remove('hide');
        }
    }

    // Handle answer selection
    function selectAnswer(e) {
        clearInterval(timer); // Stop the timer
        
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        
        if (correct) {
            selectedButton.classList.add('correct');
            score++;
            scoreElement.textContent = score;
        } else {
            selectedButton.classList.add('wrong');
        }
        
        // Show correct answer and disable all buttons
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
        });
        
        // If it's the last question, show results after a delay
        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            setTimeout(showResults, 1000);
        } else {
            nextButton.classList.remove('hide');
        }
    }

    // Move to the next question
    function nextQuestion() {
        currentQuestionIndex++;
        nextButton.classList.add('hide');
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer();
    }

    // Show final results
    function showResults() {
        const totalQuestions = shuffledQuestions.length;
        const percentage = Math.round((score / totalQuestions) * 100);
        
        finalScoreElement.textContent = score;
        maxScoreElement.textContent = totalQuestions;
        
        // Set result message based on score
        let message, emoji;
        if (percentage >= 80) {
            message = "Excellent work! You're a knowledge master!";
            emoji = "🎉";
        } else if (percentage >= 60) {
            message = "Good job! You know your stuff!";
            emoji = "👍";
        } else if (percentage >= 40) {
            message = "Not bad! Keep learning!";
            emoji = "🤔";
        } else {
            message = "Keep practicing! You'll get better!";
            emoji = "📚";
        }
        
        resultsMessageElement.textContent = message;
        resultsEmojiElement.textContent = emoji;
        
        resultsElement.classList.remove('hide');
        restartButton.classList.remove('hide');
    }

    // Restart the quiz
    function restartQuiz() {
        resultsElement.classList.add('hide');
        restartButton.classList.add('hide');
        startQuiz();
    }

    // Event listeners
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
});