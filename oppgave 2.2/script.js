const input = document.getElementById("tall");
const knapp = document.getElementById("kontroller");
const resultat = document.getElementById("resultat");

function sjekkTall() {
  const tall = Number(input.value);
  resultat.className = "resultat";

  if (input.value.trim() === "" || !Number.isInteger(tall)) {
    resultat.textContent = "Du må skrive inn et gyldig heltall.";
    resultat.classList.add("feil");
  } else if (tall % 2 === 0) {
    resultat.textContent = `${tall} er et partall.`;
    resultat.classList.add("partall");
  } else {
    resultat.textContent = `${tall} er et oddetall.`;
    resultat.classList.add("oddetall");
  }
}

knapp.addEventListener("click", sjekkTall);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sjekkTall();
  }
});
