const questionsDiv = document.querySelector('.questions');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const question = formData.get('question').trim();
    const correctAnswer = formData.get('correctAnswer').trim();
    const wrongAnswer = formData.get('wrongAnswer').trim();
    if (question === '') {
        alert('Please enter a question.');
        return;
    }
    if (correctAnswer === '' || wrongAnswer === '') {
        alert('Please enter both a correct and a wrong answer.');
        return;
    }

    questionsDiv.innerHTML += `<div class="question">
                <p class="textQuestion">${question}</p>
                <p>Correct answer: ${correctAnswer}</p>
                <p>Wrong answer: ${wrongAnswer}</p>
            </div>`
    form.reset();
});