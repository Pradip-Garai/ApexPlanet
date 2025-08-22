document.addEventListener('DOMContentLoaded', function() {
            // Quiz questions
            const questions = [
                {
                    question: "Which planet is known as the Red Planet?",
                    options: ["Venus", "Mars", "Jupiter", "Saturn"],
                    answer: 1
                },
                {
                    question: "What is the largest mammal in the world?",
                    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                    answer: 1
                },
                {
                    question: "Which element has the chemical symbol 'O'?",
                    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
                    answer: 1
                },
                {
                    question: "Who painted the Mona Lisa?",
                    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                    answer: 2
                },
                {
                    question: "What is the capital of Japan?",
                    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
                    answer: 2
                }
            ];
            
            // DOM elements
            const quizBody = document.getElementById('quiz-body');
            const resultContainer = document.getElementById('result-container');
            const questionNumber = document.getElementById('question-number');
            const questionText = document.getElementById('question-text');
            const optionsContainer = document.getElementById('options-container');
            const timerBar = document.getElementById('timer-bar');
            const timerText = document.getElementById('timer-text');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const submitBtn = document.getElementById('submit-btn');
            const restartBtn = document.getElementById('restart-btn');
            const scoreText = document.getElementById('score-text');
            const message = document.getElementById('message');
            
            // Quiz state
            let currentQuestion = 0;
            let userAnswers = new Array(questions.length).fill(null);
            let timer;
            let timeLeft = 30;
            
            // Initialize quiz
            function initQuiz() {
                showQuestion();
                startTimer();
                
                // Event listeners
                prevBtn.addEventListener('click', goToPreviousQuestion);
                nextBtn.addEventListener('click', goToNextQuestion);
                submitBtn.addEventListener('click', showResults);
                restartBtn.addEventListener('click', restartQuiz);
                
                // Option selection
                optionsContainer.addEventListener('click', function(e) {
                    if (e.target.classList.contains('option')) {
                        const optionIndex = parseInt(e.target.getAttribute('data-index'));
                        selectOption(optionIndex);
                    }
                });
            }
            
            // Show current question
            function showQuestion() {
                const question = questions[currentQuestion];
                
                questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
                questionText.textContent = question.question;
                
                // Clear previous options
                optionsContainer.innerHTML = '';
                
                // Add new options
                question.options.forEach((option, index) => {
                    const optionElement = document.createElement('div');
                    optionElement.classList.add('option');
                    optionElement.setAttribute('data-index', index);
                    optionElement.textContent = option;
                    
                    if (userAnswers[currentQuestion] === index) {
                        optionElement.classList.add('selected');
                    }
                    
                    optionsContainer.appendChild(optionElement);
                });
                
                // Update buttons
                prevBtn.disabled = currentQuestion === 0;
                
                if (currentQuestion === questions.length - 1) {
                    nextBtn.style.display = 'none';
                    submitBtn.style.display = 'block';
                } else {
                    nextBtn.style.display = 'block';
                    submitBtn.style.display = 'none';
                }
            }
            
            // Select an option
            function selectOption(optionIndex) {
                userAnswers[currentQuestion] = optionIndex;
                
                // Update UI to show selected option
                const options = optionsContainer.querySelectorAll('.option');
                options.forEach(option => option.classList.remove('selected'));
                options[optionIndex].classList.add('selected');
            }
            
            // Start timer for current question
            function startTimer() {
                clearInterval(timer);
                timeLeft = 30;
                updateTimerDisplay();
                
                timer = setInterval(function() {
                    timeLeft--;
                    updateTimerDisplay();
                    
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        if (currentQuestion === questions.length - 1) {
                            showResults();
                        } else {
                            goToNextQuestion();
                        }
                    }
                }, 1000);
            }
            
            // Update timer display
            function updateTimerDisplay() {
                const percentage = (timeLeft / 30) * 100;
                timerBar.style.width = `${percentage}%`;
                timerText.textContent = `${timeLeft}s`;
                
                // Change color when time is running out
                if (timeLeft <= 10) {
                    timerBar.style.background = '#ff4757';
                } else if (timeLeft <= 20) {
                    timerBar.style.background = '#ffa502';
                } else {
                    timerBar.style.background = '#ffce54';
                }
            }
            
            // Navigate to next question
            function goToNextQuestion() {
                clearInterval(timer);
                currentQuestion++;
                showQuestion();
                startTimer();
            }
            
            // Navigate to previous question
            function goToPreviousQuestion() {
                clearInterval(timer);
                currentQuestion--;
                showQuestion();
                startTimer();
            }
            
            // Show quiz results
            function showResults() {
                clearInterval(timer);
                
                // Calculate score
                let score = 0;
                userAnswers.forEach((answer, index) => {
                    if (answer === questions[index].answer) {
                        score++;
                    }
                });
                
                // Update results UI
                scoreText.textContent = `${score}/${questions.length}`;
                
                // Set message based on score
                if (score === questions.length) {
                    message.textContent = "Perfect! You got all questions right!";
                } else if (score >= questions.length * 0.7) {
                    message.textContent = "Great job! You scored well above average!";
                } else if (score >= questions.length * 0.5) {
                    message.textContent = "Good effort! You passed the quiz.";
                } else {
                    message.textContent = "Keep practicing to improve your knowledge.";
                }
                
                // Show results, hide quiz
                quizBody.style.display = 'none';
                document.querySelector('.quiz-footer').style.display = 'none';
                document.querySelector('.quiz-header').style.display = 'none';
                resultContainer.style.display = 'block';
            }
            
            // Restart quiz
            function restartQuiz() {
                currentQuestion = 0;
                userAnswers = new Array(questions.length).fill(null);
                
                // Reset UI
                quizBody.style.display = 'block';
                document.querySelector('.quiz-footer').style.display = 'flex';
                document.querySelector('.quiz-header').style.display = 'block';
                resultContainer.style.display = 'none';
                
                showQuestion();
                startTimer();
            }
            
            // Initialize the quiz
            initQuiz();
        });