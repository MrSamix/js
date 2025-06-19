const form = document.getElementById("loginForm");
const message = document.getElementById("message");
// const showPassBtn = document.getElementById("showPassBtn")

form.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email").trim();
    const password = formData.get("password");
    
    if (email === "" || password === "") {
        message.innerHTML = '<p class = "error">All fields are required.</p>'   
        return
    }
    if(!email.includes("@")){
        message.innerHTML = '<p class = "error">Enter valid email.</p>'   
        return
    }

    message.innerHTML = '<p class = "success">Login successful!</p>'   


    localStorage.setItem("email", email)
})

showPassBtn.addEventListener("click", (e) => {
    if (form.elements.password.type === "password") {
        form.elements.password.type = "text"
        e.target.innerHTML = "Hide Password"
    }
    else{
        form.elements.password.type = "password"
        e.target.innerHTML = "Show Password"
    }
})

const email = localStorage.getItem("email");
if (email != null) {
    form.elements.email.value = email;
}

clearBtn.addEventListener("click", () => {
    if (email != null) {
        localStorage.removeItem("email")
    }
})