const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const stuffauthent = require("./routes/authentification.js");
const poste = require("./routes/poste.js");
const dotenv = require("dotenv");

dotenv.config();
var helmet = require("helmet");
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASSWORD +
      "@cluster0.t7gkg.mongodb.net/" +
      process.env.DB_NAME +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.json());

let port = 3001;
const portArg = process.argv[2];
if (portArg !== undefined && !Number.isNaN(parseInt(portArg, 10))) {
  port = parseInt(portArg, 10);
}

app.get("/", (req, res) => {
  res.send("<h1>Hello from Nodemon!!!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

app.use("/api/auth", stuffauthent);
app.use("/api/poste", poste);
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;
