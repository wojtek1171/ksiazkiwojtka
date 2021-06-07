// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const imgur = require("imgur");

const app = express();
const port = process.env.PORT || 5000;

// midllewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

// routes prefix
app.use("/api/book", require("./routes/books"));
app.use("/api/quote", require("./routes/quotes"));
app.use("/api/user", require("./routes/users"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/dist"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

// start serveer
app.listen(port, () => console.log(`server running at http://localhost:${port}`));
