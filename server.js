const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
// Morgan is for login
const morgan = require("morgan");
const exphbs = require("express-handlebars");

// load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// Logging - Morgan Middleware
// only run in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handlebars - setting our view engine
// app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.engine(".hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
