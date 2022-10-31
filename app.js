const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

//-----------------POST ROUTER----------------------

const postRouter = require("./views/postRouter");
app.use("/", postRouter);


//-----------------ERROR ROUTES----------------------


app.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - not found",
    message: "no route found for the request url",
  });
});

app.use((error, req, res, next) => {
  console.error("there is an error: ", error);
  if (res.statusCode < 400) {
    res.status(500);
  }
  console.log(error.message, "this is the error label");

  res.send({ error: error.message, message: error.message });
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
