const http = require("http");
const fs = require("fs");
const path = require("path");
const { MAX_T, finnPrimtallnummer } = require("./program");

const port = 3001;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/api/primtall") {
    const T = Number(url.searchParams.get("T"));

    if (!Number.isSafeInteger(T) || T < 1 || T > MAX_T) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        feil: `T må være et heltall mellom 1 og ${MAX_T}.`,
      }));
      return;
    }

    const start = performance.now();
    const svar = finnPrimtallnummer(T);
    const tidMs = Math.round(performance.now() - start);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ T, svar, tidMs }));
    return;
  }

  let relativeFile = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  const target = path.resolve(__dirname, relativeFile);

  if (!target.startsWith(__dirname + path.sep)) {
    response.writeHead(403);
    response.end("Ingen tilgang");
    return;
  }

  fs.readFile(target, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Fant ikke siden");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Primtall-nettsiden kjører på http://127.0.0.1:${port}`);
});
