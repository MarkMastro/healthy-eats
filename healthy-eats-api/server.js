// load .env data into process.env
require("dotenv").config();
const bodyParser = require("body-parser");

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(cors());
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const ordersRoute = require("./routes/orders");
const userSavedRecipes = require("./routes/savedRecipes");
const userLikedRecipes = require("./routes/likedRecipes");
const userCreatedRecipes = require("./routes/createdRecipes");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

const userShoppingList = require("./routes/shoppingLists");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/orders", ordersRoute(db));
app.use("/api/savedRecipes", userSavedRecipes(db));
app.use("/api/likedRecipes", userLikedRecipes(db));
app.use("/api/shoppingLists", userShoppingList(db));
app.use("/api/createdRecipes", userCreatedRecipes(db))
app.listen(PORT, () => {
});
