import data from "./cardGame.json" assert { type: "json" };

console.log(data.cards[0].name);
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
const drawButton = document.getElementById("drawButton");
disableCards()

let drawArray = [];

drawButton.addEventListener("click", draw);
card1.addEventListener("click", revealCard1);
card2.addEventListener("click", revealCard2);
card3.addEventListener("click", revealCard3);
card4.addEventListener("click", revealCard4);
card5.addEventListener("click", revealCard5);

function draw() {
    for (let i = 0; i < 5; i++) {
        drawArray[i] = Math.floor(Math.random() * 20) + 1; 
    }
    enableCards()
    card1.style.background = "rgb(0, 0, 0)";
    card2.style.background = "rgb(0, 0, 0)";
    card3.style.background = "rgb(0, 0, 0)";
    card4.style.background = "rgb(0, 0, 0)";
    card5.style.background = "rgb(0, 0, 0)";

    console.log("test");
}

function revealCard1() {
    card1.style.background = "rgb(119, 144, 173)";
    card1.innerText = data.cards[drawArray[0]].name + "\n" + data.cards[drawArray[0]].suit;
}
function revealCard2() {
    card2.style.background = "rgb(119, 144, 173)";
    card2.innerText = data.cards[drawArray[1]].name + "\n" + data.cards[drawArray[1]].suit;
}
function revealCard3() {
    card3.style.background = "rgb(119, 144, 173)";
    card3.innerText = data.cards[drawArray[2]].name + "\n" + data.cards[drawArray[2]].suit;
}
function revealCard4() {
    card4.style.background = "rgb(119, 144, 173)";
    card4.innerText = data.cards[drawArray[3]].name + "\n" + data.cards[drawArray[3]].suit;
}
function revealCard5() {
    card5.style.background = "rgb(119, 144, 173)";
    card5.innerText = data.cards[drawArray[4]].name + "\n" + data.cards[drawArray[4]].suit;
}
function enableCards() {
    card1.disabled = false;
    card2.disabled = false;
    card3.disabled = false;
    card4.disabled = false;
    card5.disabled = false;
}
function disableCards() {
    card1.disabled = true;
    card2.disabled = true;
    card3.disabled = true;
    card4.disabled = true;
    card5.disabled = true;
}