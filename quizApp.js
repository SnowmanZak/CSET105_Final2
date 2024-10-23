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
        options: ["True", "False", "Only on Halloween", "In dreams"],
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
let gifTimeout; // To store the timeout for hiding GIFs

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
    for (let i = 0; i < questionObj.options.length; i++) {
        const optionContainer = document.createElement("div");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "question"; // Same name for all options
        radioInput.value = i;

        const label = document.createElement("label");
        label.textContent = questionObj.options[i];

        optionContainer.appendChild(radioInput);
        optionContainer.appendChild(label);
        quizContainer.appendChild(optionContainer);
    }

    // Show the next button if there are more questions
    const nextButton = document.getElementById("next-btn");
    if (currentQuestionIndex < quizData.length - 1) {
        nextButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "none";
    }

    // Show submit button if it's the last question
    const submitButton = document.getElementById("submit-btn");
    if (currentQuestionIndex === quizData.length - 1) {
        submitButton.style.display = "inline-block";
    } else {
        submitButton.style.display = "none";
    }
}

// Function to show correct or incorrect GIF
function showGif(isCorrect) {
    const gifContainer = document.getElementById("gif-container");
    gifContainer.style.display = "block"; // Show the GIF container

    // Set the correct or incorrect GIF based on the answer
    if (isCorrect) {
        gifContainer.innerHTML = '<img src="https://media.tenor.com/Qb4QTiYvh3cAAAAM/gif.gif" alt="Correct" />';
    } else {
        gifContainer.innerHTML = '<img src="https://i.gifer.com/origin/4f/4fb1b29a1cde7181b092e97f4be8a83c_w200.gif" alt="Incorrect" />';
    }

    // Hide the GIF after 3 seconds
    clearTimeout(gifTimeout);
    gifTimeout = setTimeout(() => {
        gifContainer.style.display = "none";
    }, 3000); 
}

// Function to go to the next question
function nextQuestion() {
    const options = document.getElementsByName("question");
    let selectedOption = null;

    // Loop through radio buttons to find the selected one
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedOption = options[i];
            break;
        }
    }

    if (!selectedOption) {
        alert("Please select an answer before proceeding.");
        return; // Don't proceed if no answer is selected
    }

    // Increment the score if the selected answer is correct
    const isCorrect = parseInt(selectedOption.value) === quizData[currentQuestionIndex].correct;
    if (isCorrect) {
        score++;
    }

    // Show the correct or incorrect GIF
    showGif(isCorrect);

    // Move to the next question after showing the GIF for 5 seconds
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion(); // Display the next question
    }, 3000);
}

// Function to submit the quiz
function submitQuiz() {
    const options = document.getElementsByName("question");
    let selectedOption = null;

    // Loop through radio buttons to find the selected one
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedOption = options[i];
            break;
        }
    }

    // Check the last question's answer
    const isCorrect = selectedOption && parseInt(selectedOption.value) === quizData[currentQuestionIndex].correct;
    if (isCorrect) {
        score++;
    }

    // Show the correct or incorrect GIF
    showGif(isCorrect);

    // After GIF timeout, hide the quiz and show the score
    setTimeout(() => {
        document.getElementById("quiz-container").style.display = "none";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("submit-btn").style.display = "none";

        const scoreContainer = document.getElementById("score-container");
        scoreContainer.style.display = "block";
        document.getElementById("score").textContent = `${score}/${quizData.length}`;
    }, 3000); 
        // Change the background to the GIF
        setTimeout(function() {
            // Change the background to the GIF
            document.body.style.backgroundImage = "url('https://media2.giphy.com/media/dMnnBdgWoamITEfOor/giphy.gif')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundPosition = "center";
        }, 4000); // 4-second delay before background change


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
    document.getElementById("gif-container").style.display = "none"; // Hide GIF on restart

    

    // Redisplay the first question
    displayQuestion();
}

// Display the first question initially
displayQuestion();
