const mongoose = require("mongoose");

const NewPostUser = mongoose.Schema({
  userId: { type: String, required: true },
  nom: { type: String, required: true },
  prénom: { type: String, required: true },
  inputTextPost: { type: String, required: true },
  datePost: { type: Date },
  UrlImage: { type: String },
  like: { type: Number },
  dislike: { type: Number },
});

module.exports = mongoose.model("newPostUser", NewPostUser);
