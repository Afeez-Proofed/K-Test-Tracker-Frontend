/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(morgan("dev"));

app.use(express.static(join(__dirname, "dist")));

app.use((_, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

let port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`));
