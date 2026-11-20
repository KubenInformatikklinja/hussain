const readline = require("readline");

const MAX_T = 10_000_000;
const SEGMENT_ODDS = 1 << 20;

function primtallOppTil(grense) {
  const sammensatt = new Uint8Array(grense + 1);
  const primtall = [];

  for (let tall = 2; tall * tall <= grense; tall++) {
    if (sammensatt[tall] === 0) {
      for (let multiplum = tall * tall; multiplum <= grense; multiplum += tall) {
        sammensatt[multiplum] = 1;
      }
    }
  }

  for (let tall = 2; tall <= grense; tall++) {
    if (sammensatt[tall] === 0) {
      primtall.push(tall);
    }
  }

  return primtall;
}

function finnPrimtallnummer(T) {
  if (T <= 5) {
    return [2, 3, 5, 7, 11][T - 1];
  }

  // Dette er en øvre grense for det T-te primtallet når T >= 6.
  let grense = Math.ceil(T * (Math.log(T) + Math.log(Math.log(T))));

  while (true) {
    const basisprimtall = primtallOppTil(Math.floor(Math.sqrt(grense)));
    let antall = 1; // 2 er det første primtallet.

    for (let lav = 3; lav <= grense; lav += SEGMENT_ODDS * 2) {
      let hoy = Math.min(grense, lav + (SEGMENT_ODDS - 1) * 2);
      if (hoy % 2 === 0) {
        hoy--;
      }

      const antallOddetall = Math.floor((hoy - lav) / 2) + 1;
      const sammensatt = new Uint8Array(antallOddetall);

      for (const p of basisprimtall) {
        const p2 = p * p;
        if (p2 > hoy) {
          break;
        }

        let start = Math.max(p2, Math.ceil(lav / p) * p);
        if (start % 2 === 0) {
          start += p;
        }

        for (let indeks = (start - lav) / 2; indeks < antallOddetall; indeks += p) {
          sammensatt[indeks] = 1;
        }
      }

      for (let indeks = 0; indeks < antallOddetall; indeks++) {
        if (sammensatt[indeks] === 0 && ++antall === T) {
          return lav + indeks * 2;
        }
      }
    }

    // Sikkerhetsnett dersom øvre grense-formelen skulle være utilstrekkelig.
    grense *= 2;
  }
}

function kjørTerminal() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Hvilket primtallnummer vil du finne (T)? ", (svar) => {
    const T = Number(svar.trim());

    if (!Number.isSafeInteger(T) || T < 1 || T > MAX_T) {
      console.log(`T må være et heltall mellom 1 og ${MAX_T}.`);
    } else {
      console.log(`Primtall nr. ${T} er ${finnPrimtallnummer(T)}.`);
    }

    rl.close();
  });
}

module.exports = { MAX_T, finnPrimtallnummer };

if (require.main === module) {
  kjørTerminal();
}
