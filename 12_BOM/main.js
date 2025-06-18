const ul = document.querySelector("ul")


function renderUl(){
    ul.innerHTML = "";
    ul.innerHTML = `<li>User agent: ${navigator.userAgent}</li>
    <li>Browser Language: ${navigator.language}</li>
    <li>Platform: ${navigator.userAgentData.platform}</li>
    <li>Screen resolution: ${screen.width} x ${screen.height}</li>
    <li>Available screen resolution: ${screen.availWidth} x ${screen.availHeight}</li>
    <li>Current URL: ${location.href}</li>`
}

renderUl();

function updateTime(){
    currentTime.textContent = `Current time: ${new Date().toLocaleTimeString()}`
}

setInterval(updateTime,500)

let nameUser = localStorage.getItem("name")
if (nameUser == null) {
    nameUser = prompt("Enter a name: ")
    localStorage.setItem("name", nameUser);
    alert("Hello, " + nameUser + "!");
}


addToLink.addEventListener("click", () => {
    if (location.href.includes("#profile")) {
        return;
    }
    location.href += "#profile"
    history.pushState(null, "", location.href)
    renderUl();
})

changeNameBtn.addEventListener("click", () => {
    let nameUser = localStorage.getItem("name")
    if (nameUser != null) {
        nameUser = prompt("Enter a new name: ")
        localStorage.setItem("name", nameUser);
        alert("Hello, " + nameUser + "!");
    }
    else{
        alert("You don't have name in localStorage");
    }
})


deleteNameBtn.addEventListener("click", () => {
    let nameUser = localStorage.getItem("name")
    if (nameUser != null) {
        localStorage.removeItem("name");
        alert("Name deleted from localStorage!")
    }
    else{
        alert("You don't have name in localStorage");
    }
})



let lastVisit = document.cookie;
if (lastVisit) {
    lastVisit = lastVisit.split('; ').find(row => row.startsWith('lastVisit'));
    lastVisit = new Date(lastVisit).toLocaleString();
    alert(`Your last visit was on: ${lastVisit}`);
}
else {
    lastVisit = "This is your first visit!";
    alert(lastVisit);
}
lastVisit = new Date();
document.cookie = `lastVisit=${lastVisit};`;



document.getElementById('addToLink').addEventListener('click', () => {
    window.location.hash = 'profile';
});


document.getElementById('openGoogleBtn').addEventListener('click', () => {
    window.open('https://www.google.com', '_blank');
});


document.getElementById('toggleThemeBtn').addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
    const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    body.classList.remove(currentTheme);
    body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
});

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(savedTheme);
    }
});

clearCookiesBtn.addEventListener('click', () => {
    document.cookie = "lastVisit=''; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    cookieMessage.textContent = 'Cookies have been cleared!';
});


goBackBtn.addEventListener('click', () => {
    history.back();
});

goForwardBtn.addEventListener('click', () => {
    history.forward();
});