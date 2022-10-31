const express = require ("express");
const postRouter = express.Router();
const postBank = require("../postBank")

postRouter.get("/", async (req, res) => {
    const posts = postBank.list()

    res.send(`<!DOCTYPE html>
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
    </html>`)
})

postRouter.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

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


module.exports = postRouter