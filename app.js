const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;

  res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    // If the post wasn't found, just throw an error
    throw new Error('Not found')
  }
  // ... Otherwise, send the regular post detail HTML

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
  console.log(error.message, "this is the error label")

  res.send({ error: error.message, message: error.message });
});
  
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});



