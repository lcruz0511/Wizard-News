const postBank = require("../postBank");
const posts = postBank.find();
post = posts

const express = require("express");
const postDetailsRouter = express.Router();



module.exports = postDetails => `<!DOCTYPE html>
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
    </html>`

// const express = require("express");
// const postBank = require("../postBank");
// const postDetailsRouter = express.Router();

// postDetailsRouter.get("/", async (req, res) => {
//   const id = req.params.id;
//   const post = postBank.find(id);

//   // if (!post.id) {
//   //   throw new Error('Not found')
//   // }

//   res.send(`<!DOCTYPE html>
//   <html>
//     <head>
//       <title>Wizard News</title>
//       <link rel="stylesheet" href="/style.css" />
//     </head>
//       <body>
//         <div class="news-list">
//           <header><img src="/logo.png"/>Wizard News</header>
//           <p><span>${post.title}</span>
//           <small>(by ${post.name})</small></p>
//           <div>${post.content}</div>
//         </div>
//       </body>
//       </html>`);
// });

// postDetailsRouter.get("/:id", async (req, res) => {
//   console.log(req.params.id, "i am params id");
// });

// module.exports = postDetailsRouter;
