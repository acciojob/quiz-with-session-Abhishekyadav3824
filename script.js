// Questions
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

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load session progress
let savedProgress = sessionStorage.getItem("progress");
let userAnswers = savedProgress ? JSON.parse(savedProgress) : {};

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

      // Restore saved state
      if (userAnswers[i] === choice) {
        radio.checked = true;
        radio.setAttribute("checked", "true"); // Required for Cypress
      }

      radio.addEventListener("click", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));

        // Remove checked attribute from all radios in this question
        document
          .querySelectorAll(`input[name="question-${i}"]`)
          .forEach(r => r.removeAttribute("checked"));

        // Add checked="true" for Cypress
        radio.setAttribute("checked", "true");
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

// Submit quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});
