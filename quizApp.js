const quizData = [
    {   //Question 1
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2 
    },
    {   //Question 2
        question: "Which language is used for web apps?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correct: 1
    },
    {   //Question 3
        question: "Who is the founder of Microsoft?",
        options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
        correct: 1
    },
    {   //Question 4
        question: "What is 9 + 10?",
        options: ["20","21","19","18"],
        correct: 2
    },
    {   //Question 5
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "H2"],
        correct: 0
    },
    {   //Question 6
        question: "What British prison colony became a country?",
        options: ["France", "United States of America", "India", "Australia"],
        correct: 3
    },
    {   //Question 7
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Iron", "Quartz"],
        correct: 1
    },
    {   //Question 8
        question: "When the Boogeyman goes to sleep, he checks his closet for Chuck Norris.",
        options: [
            "True", "False", "Only on Halloween", "In dreams"],
        correct: 0
    },
    {   //Question 9
        question: "Which of the Seven Wonders of the ANCIENT World still remain to this day?",
        options: ["Colossus of Rhodes", "Lighthouse of Alexanderia", "Great Pyramid of Giza", "Hanging Gardens of Babylon"],
        correct: 2
    },
    {   //Question 10
        question: "Who is the best pass rusher in the NFL?",
        options: ["Micah Parsons", "TJ Watt", "Myles Garrett", "Nick Bosa"],
        correct: 1
    },
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