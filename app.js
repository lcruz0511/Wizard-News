const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

// const postListRouter = require("./views/postList");
// app.use("/", postListRouter);

// const postDetailsRouter = require("./views/postDetails");
// app.use("/posts/:id", postDetailsRouter);

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts));
});

// app.get("/posts/:id", (req, res) => {
//   const posts = postBank.find(req.params.id);
//   res.send(postDetails(posts));
// });

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    throw new Error('Not found')
  }

  res.send(`<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png"/>Wizard News</header>
          <p><span>${post.title}</span>
          <small>(by ${post.name})</small></p>
          <div>${post.content}</div>
        </div>
      </body>
      </html>`);
});


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
