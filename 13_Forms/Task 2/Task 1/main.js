const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const login = form.elements.login.value

    const checkbox = form.elements.remember.checked

    alert(`Привіт, ${login}! Я тебе ${checkbox === true? "запам'ятав" : "не запам'ятав"}`)
})