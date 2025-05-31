// Task 1
let ball = document.querySelector("#ball");
document.querySelector("#football-field").addEventListener("click",function(e){
    // console.log(e);
    if (e.offsetX + ball.width > this.width) {
        ball.style.left = this.width - (ball.width/2) + "px";
    }
    else if (e.offsetX - (ball.width/2) < 0) {
        ball.style.left = (ball.width/1.5) + "px";
    }
    else
    {
        ball.style.left = e.offsetX + "px";
    }
    if (e.offsetY + ball.height > this.height) {
        ball.style.top = this.height - (ball.height/2) + "px";
    }
    else if (e.offsetY - ball.height < 0) {
        ball.style.top = (ball.height/1.5) + "px";
    }
    else
    {
        ball.style.top = e.offsetY + "px";
    }
})

let border = document.querySelectorAll(".color");
border[0].style.backgroundColor = "red";
let btn = document.querySelector(".btn-next");
btn.addEventListener("click", function() {
    if (border[0].style.backgroundColor !== "grey") {
        border[0].style.backgroundColor = "grey";
        border[1].style.backgroundColor = "#ffc107";
    }
    else if (border[1].style.backgroundColor !== "grey") {
        border[1].style.backgroundColor = "grey";
        border[2].style.backgroundColor = "green";
    }
    else if (border[2].style.backgroundColor !== "grey") {
        border[2].style.backgroundColor = "grey";
        border[0].style.backgroundColor = "red";
    }
});
