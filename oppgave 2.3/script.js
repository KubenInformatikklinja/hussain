const skjema = document.getElementById("skjema");
const input = document.getElementById("T");
const resultat = document.getElementById("resultat");

skjema.addEventListener("submit", async (event) => {
  event.preventDefault();
  const T = input.value.trim();

  if (!T) {
    resultat.className = "resultat feil";
    resultat.innerHTML = "<p>Skriv inn en verdi for T.</p>";
    return;
  }

  resultat.className = "resultat laster";
  resultat.innerHTML = "<p>Beregner…</p>";

  try {
    const response = await fetch(`/api/primtall?T=${encodeURIComponent(T)}`);
    const data = await response.json();

    if (!response.ok) {
      resultat.className = "resultat feil";
      resultat.innerHTML = `<p>${data.feil}</p>`;
      return;
    }

    resultat.className = "resultat svar";
    resultat.innerHTML = `
      <p>Primtall nr. <strong>${data.T.toLocaleString("nb-NO")}</strong></p>
      <output>${data.svar.toLocaleString("nb-NO")}</output>
      <small>Beregnet på ${data.tidMs} ms</small>
    `;
  } catch {
    resultat.className = "resultat feil";
    resultat.innerHTML = "<p>Klarte ikke å kontakte serveren.</p>";
  }
});
