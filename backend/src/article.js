const { sessionUser, cookieKey, connectionString } = require("./server");
const mongoose = require("mongoose");
const {
  createArticle,
  findArticles,
  findById,
  findByUser,
  updateArticle,
} = require("./database/articleSchema");

function getArticles(req, res) {
  // res.header("Access-Control-Allow-Origin", "*");
  //res.setHeader("Cache-Control","no-cache");
  //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let id = req.params.id;
  // get article by pid
  (async () => {
    const connector = mongoose.connect(connectionString);
    if (id) {
      let articles = await connector.then(async () => {
        return findById(id);
      });
      console.log("get articles by id: " + articles)
      res.send({ articles: [articles] });
    } else {
      let username = req.query.username;
      let articles = await connector.then(async () => {
        return findByUser(username);
      });
      console.log("get articles by user: " + username + ' ' + articles)
      res.send({ articles: articles });
    }
  })();
}

// TODO: get the correct article by using the id
function updateArticleHandler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control","no-cache");
  console.log(res)
  let text = req.body.text;
  let pid = req.params.id;
  let commentId = req.body.commentId;
  let username = req.username;
  (async () => {
    const connector = mongoose.connect(connectionString);
    let article = await connector.then(async () => {
      return findById(pid);
    });
    // Forbidden if the user does not own the article.
    if (article.author !== username) {
      res.sendStatus(401);
    }
    updatedArticle = article;
    if (!commentId) {
      // Update the article :id with a new text if commentId is not supplied.
      updatedArticle = await connector.then(async () => {
        return updateArticle({ pid: pid }, { text: text });
      });
    } else if (commentId === -1) {
      article.comments.push(text);
      updatedArticle = await connector.then(async () => {
        return updateArticle({ pid: pid }, { comments: article.comments });
      });
    } else {
      // If commentId is supplied, then update the requested comment on the article, if owned.
      article.comments[commentId] = text;
      updatedArticle = await connector.then(async () => {
        return updateArticle({ pid: pid }, { comments: article.comments });
      });
    }
    res.send({ articles: [updatedArticle] });
  })();
}

function addArticle(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let username = req.body.username;
  console.log(req);

  (async () => {
    const connector = mongoose.connect(connectionString);
    let articles = await connector.then(async () => {
      return findArticles();
    });
    pid = articles.length + 1;

    let article = {
      pid: pid,
      author: username,
      text: req.body.text,
      date: Date.now(),
      Comment: [],
    };

    let articleResponse = await connector.then(async () => {
      return createArticle(article);
    });
    articles.push(articleResponse);
    res.send({ articles: articles });
  })();
}

module.exports = (app) => {
  app.get("/articles", getArticles);
  app.put("/articles/:id", updateArticleHandler);
  app.post("/article", addArticle);
};
