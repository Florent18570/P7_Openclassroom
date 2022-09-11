const userSchema = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new userSchema({
        email: req.body.email,
        password: hash,
        nom: req.body.nom,
        prénom: req.body.prénom,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  userSchema
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            success: "connexion réussite ! ",
            userId: user._id,
            prénom: user.prénom,
            nom: user.nom,
            token: jwt.sign(
              {
                userId: user._id,
              },
              process.env.JWT_TOKEN_KEY,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.alluser = (req, res, next) => {
  userSchema
    .find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => res.status(400).json({ error }));
};
