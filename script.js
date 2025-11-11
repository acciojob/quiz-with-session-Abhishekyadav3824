// Questions (do not modify)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previously saved answers from sessionStorage
let savedProgress = sessionStorage.getItem("progress");
let userAnswers = savedProgress ? JSON.parse(savedProgress) : {};

// ==========================
// Render All Questions
// ==========================
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const qDiv = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = questions[i].question;
    qDiv.appendChild(qText);

    questions[i].choices.forEach(choice => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      radio.addEventListener("click", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      qDiv.appendChild(radio);
      qDiv.appendChild(label);
    });

    questionsElement.appendChild(qDiv);
  }
}

renderQuestions();

// ==========================
// Submit Quiz
// ==========================
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save final score in localStorage
  localStorage.setItem("score", score);
});
