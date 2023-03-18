import data from "./cardJSON.json" assert { type: "json" };

let title = document.getElementById("titlebox");
let desc = document.getElementById("description");
let flavour = document.getElementById("flavour");
let type = document.getElementById("cardtype");
let image = document.getElementById("cardimage");
let next = document.getElementById("next");
let cardNum = 0;

next.addEventListener("click", nextCard);

function nextCard() {
    cardNum++;
    title.innerText = data.cards[cardNum].name;
    desc.innerText = data.cards[cardNum].description;
    flavour.innerText = data.cards[cardNum].flavourText;
    type.innerText = data.cards[cardNum].type;
    image.src = data.cards[cardNum].imageUrl;

}


