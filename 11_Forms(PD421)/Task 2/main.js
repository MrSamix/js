const showTextButton =  document.getElementById('showTextButton')



showTextButton.onclick = function () {
    const textInput = document.getElementById('textInput').value;
    const styledText = document.getElementById('styledText');


    styledText.textContent = textInput;
    styledText.style.fontWeight = document.getElementById('bold').checked ? 'bold' : 'normal';
    styledText.style.textDecoration = document.getElementById('underline').checked ? 'underline' : 'none';
    styledText.style.fontStyle = document.getElementById('italic').checked ? 'italic' : 'normal';


    const alignment = document.querySelector('input[name="alignment"]:checked').value;
    styledText.style.textAlign = alignment;
};