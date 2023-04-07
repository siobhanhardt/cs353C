import data from '../cardJSON.json' assert { type: 'json' };

const cardContainer = document.getElementById('card-container');
const leftarrow = document.getElementById('leftarrow');
const rightarrow = document.getElementById('rightarrow');
const sortSelect = document.getElementById('sort');
const filterSelect = document.getElementById('filterSelect');
const cardAmount = data.cards.length;
const originalCards = [...data.cards];
let currentCards = originalCards;
var firstnum = 0;
var lastnum = 8;

leftarrow.addEventListener("click", prev);
rightarrow.addEventListener("click", next);
sortSelect.addEventListener('change', sortCards);
filterSelect.addEventListener('change', () => filterCards(filterSelect.value));

function displayCards(firstnum, lastnum, cards) {
    cardContainer.innerHTML = '';
    cards.slice(firstnum, lastnum).forEach((card) => {
      const newCard = document.createElement('div');
      newCard.className = 'card';
      newCard.innerHTML = `
        <div class="titlebox">${card.name}</div>
        <div class="textbox">
          <p>${card.description}</p>
          <hr>
          <p><i>${card.flavourText}</i></p>
        </div>
        <div class="cardtype">${card.type}</div>
        <div class="imagebox">
          <img src="../${card.imageUrl}" class="cardimage">
        </div>
      `;
      cardContainer.appendChild(newCard);
    });
  }

  displayCards(firstnum, lastnum, currentCards);

  function prev() {
    firstnum = firstnum - 8;
    lastnum = lastnum - 8;
    if (firstnum <= 0) {
        firstnum = 0;
        lastnum = 8;
    }
    if (lastnum % 8 != 0) {
        lastnum = lastnum - (lastnum % 8);
        lastnum = lastnum + 8;
    }
    console.log(firstnum, lastnum);
    displayCards(firstnum, lastnum, currentCards);
}

function next() {
    lastnum = lastnum + 8;
    firstnum = firstnum + 8;
    const cardAmount = currentCards.length;
    if (lastnum >= cardAmount) {
        lastnum = cardAmount;
        firstnum = cardAmount - (cardAmount % 8);
    }
    console.log(firstnum, lastnum);
    displayCards(firstnum, lastnum, currentCards);
}
  function sortCards() {
    const sortValue = sortSelect.value;
    if (sortValue === 'nameAsc') {
        currentCards.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'nameDesc') {
        currentCards.sort((a, b) => b.name.localeCompare(a.name));
    } else {
        currentCards = originalCards.slice();
    }

    displayCards(firstnum, lastnum, currentCards);
}
function filterCards(type) {
    if (type === 'all') {
        currentCards = originalCards;
    } else {
        currentCards = originalCards.filter(card => card.type === type);
    }
    displayCards(firstnum, lastnum, currentCards);
}

  