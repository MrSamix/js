const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const login = form.elements.login.value

    const email = form.elements.email.value

    const password = form.elements.password.value

    const repeatPassword = form.elements.repeatPassword.value

    if (!login || !email || !password || !repeatPassword) {
        alert("All fields are required!");
        return;
    }
    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
    }
    alert(`На ${email} надіслано лист із підтвердженням`)
})