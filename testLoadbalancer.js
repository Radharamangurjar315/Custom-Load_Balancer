const http = require("http");

const TOTAL_REQUESTS = 20;   // total number of requests
const CONCURRENCY = 5;       // how many requests in parallel

let completed = 0;

function sendRequest(i) {
  return new Promise((resolve, reject) => {
    const req = http.get("http://localhost:8000", (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        console.log(`Request #${i} -> Response: ${data}`);
        resolve();
      });
    });

    req.on("error", reject);
  });
}

async function run() {
  let active = [];
  for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    active.push(sendRequest(i));

    // Run only up to CONCURRENCY at a time
    if (active.length >= CONCURRENCY) {
      await Promise.all(active);
      active = [];
    }
  }
  // wait for any leftovers
  await Promise.all(active);
  console.log("All requests completed");
}

run();
