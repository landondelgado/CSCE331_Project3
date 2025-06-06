const { exec } = require("child_process");

if (process.env.NODE_ENV === "production") {
  // Only start the backend (Render)
  exec("node Backend.js", (err, stdout, stderr) => {
    if (err) console.error(err);
    else console.log(stdout);
  });
} else {
  // Start both frontend and backend (dev)
  exec("npx concurrently \"npm run backend\" \"npm run client\"", (err, stdout, stderr) => {
    if (err) console.error(err);
    else console.log(stdout);
  });
}