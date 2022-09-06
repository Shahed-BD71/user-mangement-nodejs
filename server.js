const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let ejs = require("ejs");
const data = require("./data.json");
// const dbConnect = require('./utils/dbConnect');
const userRoutes = require("./routes/v1/users.route.js");

// middleware
app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static("public"))
app.use(express.static("views"));
app.set("view engine", ejs);

// Routes
app.use("/api/v1/users", userRoutes);
app.get("/", (req, res) => {
  const userData = data.sort(() => 0.5 - Math.random()).slice(0, 10)
  res.render("home.ejs", {
    allUser: userData,
  });
});

app.all("*", (req, res, next) => {
  res.send("No Route Found");
});

const ports = process.env.PORT || 5000;
app.listen(ports, () => console.log(`Hello from the ${ports}`));
