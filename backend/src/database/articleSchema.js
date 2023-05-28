const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  pid: {
    type: Number,
    required: [true, "ID is required"],
  },
  author: {
    type: String,
    required: [true, "author is required"],
  },
  text: {
    type: String,
    required: [true, "text is required"],
  },
  date: {
    type: Date,
    required: [true, "date is required"],
  },
  comments: {
    type: [String],
  },
});

const Article = mongoose.model("article", articleSchema);

async function createArticle(article) {
  return new Article(article).save();
}

async function updateArticle(conditions,updates) {
    return await Article.findOneAndUpdate(conditions,updates,{returnDocument:"after"});
}

async function findArticles() {
  return await Article.find();
}

async function findById(pid) {
  return await Article.findOne({ pid:pid });
}

async function findByUser(username) {
  return await Article.find({ author:username });
}

module.exports = {
  createArticle,
  findArticles,
  findById,
  findByUser,
  updateArticle
};
