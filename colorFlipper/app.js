const title = document.getElementById('titleColor');
const background = document.getElementById('backgroundColor');

const pageTitle = document.querySelector('title');

var colorState = 0

const colors = {
    simple: [
        "Black",
        "Darkkhaki",
        "Blue",
        "Darkgreen",
        "Cornflowerblue"
    ],
    hex: [
        "#F2F3AE",
        "#EDD382",
        "#FC9E4F",
        "#FF521B",
        "#020122"
    ]
}

function changeColor() {
    const colorGroup = colorState == 0 ? colors.simple : colors.hex;
    const randomColor = Math.floor(Math.random() * colorGroup.length);

    background.setAttribute('style', `background-color: ${colorGroup[randomColor]};`);
    title.innerText = `${colorGroup[randomColor]}`;
}

function changeState(num) {
    num == 0 ? colorState = 0 : colorState = 1;

    pageTitle.innerHTML = `Color Flipper! ${colorState == 1 ? 'Hex' : 'Simple'} mode`;
}