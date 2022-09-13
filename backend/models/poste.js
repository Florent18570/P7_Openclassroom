const mongoose = require("mongoose");

const NewPostUser = mongoose.Schema({
  userId: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String },
  inputTextPost: { type: String, required: true },
  datePost: { type: String },
  image: { type: String },
  // like: { type: Number },
  // dislike: { type: Number },
});

module.exports = mongoose.model("newPostUser", NewPostUser);
