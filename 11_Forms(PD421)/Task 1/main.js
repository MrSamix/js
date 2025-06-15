const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const finishBtn = document.getElementById("finishBtn");


let correctAnswers = 0;

function nextQuestion() {
    const answer1 = document.querySelector('input[name="q1"]:checked');
    if (answer1 && answer1.value === "5") {
        correctAnswers++;
    }
    document.getElementById("question1").classList.add("hidden");
    document.getElementById("question2").classList.remove("hidden");
}

function finishQuiz() {
    const answer2 = document.querySelector('input[name="q2"]:checked');
    if (answer2 && answer2.value === "5") {
        correctAnswers++;
    }
    document.getElementById("question2").classList.add("hidden");
    const resultText = `Result: ${correctAnswers} correct answers to 2 questions.`;
    document.getElementById("result-text").textContent = resultText;
    document.getElementById("result").classList.remove("hidden");
}


nextQuestionBtn.onclick = nextQuestion;
finishBtn.onclick = finishQuiz;