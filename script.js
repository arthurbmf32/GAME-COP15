const animals = [
  { 
    name: "Gavião-tesoura", 
    img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Elanoides_forficatus_Monteverde_06.jpg", 
    desc: "Realizam migração sazonal anual, partindo da região amazônica no inverno para o sul e sudeste do Brasil e até a Argentina. Após a reprodução, retornam para a Amazônia.",
    url: "https://pt.wikipedia.org/wiki/Elanoides_forficatus"
  },
  { 
    name: "Marreca-caneleira", 
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Fulvous_whistling_duck_or_fulvous_tree_duck_%28Dendrocygna_bicolor%29.jpg", 
    desc: "Ave sazonal no Pantanal: diminui drasticamente durante a seca e retorna quando as cheias chegam, movendo-se em busca de áreas alagadas com alimento.",
    url: "https://pt.wikipedia.org/wiki/Dendrocygna_bicolor"
  },
  { 
    name: "Águia-pescadora", 
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Pandion_haliaetus_%28Osprey%29.jpg", 
    desc: "Migratória, reproduz-se na América do Norte e migra para regiões mais quentes da América do Sul quando falta alimento.",
    url: "https://pt.wikipedia.org/wiki/Pandion_haliaetus"
  },
  { 
    name: "Talha-mar", 
    img: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Black_Skimmer_JG.jpg", 
    desc: "A espécie Rynchops niger realiza migrações entre América do Norte e do Sul, cruzando os Andes para reprodução e alimentação.",
    url: "https://pt.wikipedia.org/wiki/Rynchops_niger"
  }
];

let cards = [];
let flippedCards = [];
let lockBoard = false;
let attempts = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById("gameBoard");
const attemptsDisplay = document.getElementById("attempts");
const timerDisplay = document.getElementById("timer");

function createCard(animal) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">COP-15</div>
      <div class="card-back">
        <img src="${animal.img}" alt="${animal.name}">
        <span>${animal.name}</span>
      </div>
    </div>
  `;
  card.dataset.name = animal.name;
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    attempts++;
    attemptsDisplay.textContent = attempts;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.name === card2.dataset.name) {
    // Adiciona a classe .matched ao elemento .card (o pai)
    card1.classList.add("matched");
    card2.classList.add("matched");

    setTimeout(() => {
      const animal = animals.find(a => a.name === card1.dataset.name);
      
      const infoHtml = `
        <div class="card-info-header">
          <img src="${animal.img}" alt="${animal.name}">
          <h4>${animal.name}</h4>
        </div>
        <p>${animal.desc} <a href='${animal.url}' target='_blank'>Saiba mais</a></p>
      `;

      card1.querySelector(".card-back").innerHTML = infoHtml;
      card2.querySelector(".card-back").innerHTML = infoHtml;

      if (document.querySelectorAll(".matched").length === (animals.length * 2)) {
        clearInterval(interval);
        setTimeout(() => {
          alert("🎉 Parabéns! Você encontrou todos os pares! O jogo será reiniciado.");
          restartGame();
        }, 4000); 
      }
    }, 400); 
  
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      lockBoard = false;
    }, 1000);
  }
  flippedCards = [];
}

function initGame() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  lockBoard = false;
  attempts = 0;
  timer = 0;
  attemptsDisplay.textContent = attempts;
  timerDisplay.textContent = timer;
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);

  cards = [...animals, ...animals];
  cards.sort(() => 0.5 - Math.random());

  cards.forEach(animal => {
    const cardElement = createCard(animal);
    gameBoard.appendChild(cardElement);
  });
}

function restartGame() {
  initGame();
}

initGame();
