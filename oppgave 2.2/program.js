const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Skriv inn et tall: ", (svar) => {
  const tall = Number(svar);

  if (!Number.isInteger(tall)) {
    console.log("Du må skrive inn et gyldig heltall.");
  } else if (tall % 2 === 0) {
    console.log(`${tall} er et partall.`);
  } else {
    console.log(`${tall} er et oddetall.`);
  }

  rl.close();
});
