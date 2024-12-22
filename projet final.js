const quizzes = {
    science: [
        { question: "What is H2O?", options: ["Water", "Oxygen", "Salt", "Sugar"], answer: "Water" },
        { question: "What planet is the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
        { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the hardest substance?", options: ["Gold", "Diamond", "Quartz", "Iron"], answer: "Diamond" },
        { question: "Which is the largest planet?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: "Jupiter" },
        { question: "What is the main source of energy for the Earth?", options: ["The Moon", "The Sun", "The Earth itself", "The Stars"], answer: "The Sun" },
        { question: "What is the process of plants making their food called?", options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"], answer: "Photosynthesis" },
        { question: "Which gas do we breathe in?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: "Oxygen" },
        { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
        { question: "What organ pumps blood through the body?", options: ["Liver", "Heart", "Lungs", "Kidney"], answer: "Heart" }
    ],
    math: [
        { question: "2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "10 / 2?", options: ["3", "5", "4", "6"], answer: "5" },
        { question: "5 x 5?", options: ["20", "25", "30", "35"], answer: "25" },
        { question: "Square root of 16?", options: ["2", "3", "4", "5"], answer: "4" },
        { question: "12 squared?", options: ["121", "144", "132", "150"], answer: "144" },
        { question: "What is 7 x 6?", options: ["42", "48", "36", "52"], answer: "42" },
        { question: "What is 15 - 7?", options: ["8", "7", "5", "9"], answer: "8" },
        { question: "What is 9 x 3?", options: ["27", "30", "32", "28"], answer: "27" },
        { question: "What is 14 ÷ 2?", options: ["6", "7", "5", "4"], answer: "7" },
        { question: "What is 25 + 35?", options: ["50", "60", "55", "65"], answer: "60" }
    ]
};

let currentQuestionIndex = 0;
let currentCategory = "";
let score = 0;
let timer;

function startQuiz() {
    currentCategory = document.getElementById("category").value;
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    clearTimeout(timer);
    const questionData = quizzes[currentCategory][currentQuestionIndex];
    document.getElementById("quiz").innerHTML = ` 
        <div class="question">${currentQuestionIndex + 1}. ${questionData.question}</div>
        <div class="options">
            ${questionData.options.map(option => `
                <label>
                    <input type="radio" name="option" value="${option}">${option}
                </label>
            `).join('')}
        </div>
    `;
    startTimer();
}

function startTimer() {
    let timeLeft = 5; // 5-second timer
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected && selected.value === quizzes[currentCategory][currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizzes[currentCategory].length) {
        displayQuestion();
    } else {
        document.getElementById("quiz").innerHTML = "";
        document.getElementById("result").innerText = `You scored ${score} out of ${quizzes[currentCategory].length}!`;
    }
}