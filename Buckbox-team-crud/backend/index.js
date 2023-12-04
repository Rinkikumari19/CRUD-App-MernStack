var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const teamsRouter = require("./Routers/teams");
const multer = require("multer");
const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/buckbox_team";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/buckbox-teams", teamsRouter);
app.use(express.json());
app.use(errHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(7000, () => {
  console.log("Example app listening at http://127.0.0.1:7000");
});

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
