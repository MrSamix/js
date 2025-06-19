const btn = document.querySelector('button');

const RedColorInput = document.getElementById("red");
const GreenColorInput = document.getElementById("green");
const BlueColorInput = document.getElementById("blue");


const colorsResult = document.querySelector('.colorsResult');

btn.addEventListener('click', () => {
    const red = RedColorInput.value;
    const green = GreenColorInput.value;
    const blue = BlueColorInput.value;

    if (red === '' || green === '' || blue === '') {
        alert('Please fill in all color values.');
        return;
    }
    if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
        alert('Color values must be between 0 and 255.');
        return;
        
    }
    colorsResult.innerHTML += `<div class="rgbcolor">
                <div class="color" style="background-color: rgb(${red}, ${green}, ${blue});"></div>
                <p>RGB (${red}, ${green}, ${blue})</p>
            </div>`
});