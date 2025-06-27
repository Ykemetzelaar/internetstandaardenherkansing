console.log("hello");

const kleuren = ["red", "blue", "green", "yellow"];
let volgorde = [];
let spelerInvoer = [];
let huidigeIndex = 0;
let score = 0; // Nieuw: score bijhouden

function randomVolgorde(lengte) {
  let volg = [];
  for (let i = 0; i < lengte; i++) {
    volg.push(kleuren[Math.floor(Math.random() * kleuren.length)]);
  }
  return volg;
}
//https://stackoverflow.com/questions/21816595/how-to-generate-a-random-number-of-fixed-length-using-javascript
// Math.random() always returns a number lower than 1.

function toonVolgorde(volg, index = 0) {
  if (index >= volg.length) {
    document.getElementById("status").textContent = "Jij bent aan de beurt!";
    return;
  }
  const kleur = volg[index];
  const blok = document.getElementById(kleur);
  blok.classList.add("active");
  setTimeout(() => {
    blok.classList.remove("active");
    setTimeout(() => toonVolgorde(volg, index + 1), 300);
  }, 600);
}

function startSpel() {
  volgorde = randomVolgorde(4);
  spelerInvoer = [];
  huidigeIndex = 0;
  document.getElementById("status").textContent = "Let op de volgorde!";
  toonVolgorde(volgorde);
}

function klikBlok(e) {
  const kleur = e.target.id;
  spelerInvoer.push(kleur);

  if (kleur === volgorde[spelerInvoer.length - 1]) {
    if (spelerInvoer.length === volgorde.length) {
      document.getElementById("status").textContent = "Goed gedaan!";
      score++; // Score verhogen
      document.getElementById("score").textContent = score; // Score tonen
      setTimeout(startSpel, 1000); // Nieuwe ronde starten
    }
  } else {
    document.getElementById("status").textContent = "Helaas, probeer opnieuw!";
    spelerInvoer = [];
    score = 0; // Score resetten bij fout
    document.getElementById("score").textContent = score;
  }
}

document.getElementById("start-btn").addEventListener("click", startSpel);
document.querySelectorAll(".color-block").forEach((blok) => {
  blok.addEventListener("click", klikBlok);
});
