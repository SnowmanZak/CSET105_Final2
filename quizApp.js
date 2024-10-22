const quizData = [
    {   //Question 1
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2 
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Function to display the current quiz question
function displayQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear the container before rendering

    const questionObj = quizData[currentQuestionIndex];

    // Create a question title
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = questionObj.question;
    quizContainer.appendChild(questionTitle);

    // Create radio button options
    questionObj.options.forEach((option, optionIndex) => {
        const optionContainer = document.createElement("div");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "question"; // Same name for all options
        radioInput.value = optionIndex;

        const label = document.createElement("label");
        label.textContent = option;

        optionContainer.appendChild(radioInput);
        optionContainer.appendChild(label);
        quizContainer.appendChild(optionContainer);
    });

    // Show the next button if there are more questions
    const nextButton = document.getElementById("next-btn");
    nextButton.style.display = currentQuestionIndex < quizData.length - 1 ? "inline-block" : "none";

    // Show submit button if it's the last question
    const submitButton = document.getElementById("submit-btn");
    submitButton.style.display = currentQuestionIndex === quizData.length - 1 ? "inline-block" : "none";
}

// Function to go to the next question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (!selectedOption) {
        alert("Please select an answer before proceeding.");
        return; // Don't proceed if no answer is selected
    }

    // Increment the score if the selected answer is correct
    if (parseInt(selectedOption.value) === quizData[currentQuestionIndex].correct) {
        score++;
    }

    // Move to the next question
    currentQuestionIndex++;
    displayQuestion(); // Display the next question
}

// Function to submit the quiz
function submitQuiz() {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption) {
        // Check last question's answer
        if (parseInt(selectedOption.value) === quizData[currentQuestionIndex].correct) {
            score++;
        }
    }

    // Hide the quiz and show the score
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";

    // Show the score
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.style.display = "block";
    document.getElementById("score").textContent = `${score}/${quizData.length}`;

    // Change the background to the GIF
    document.body.style.backgroundImage = "url('https://media2.giphy.com/media/dMnnBdgWoamITEfOor/giphy.gif')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
}

// Function to restart the quiz
function restartQuiz() {
    // Reset everything
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("next-btn").style.display = "inline-block";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("score-container").style.display = "none";

    // Redisplay the first question
    displayQuestion();
}

// Display the first question initially
displayQuestion();