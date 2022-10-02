const NewPostUser = require("../models/poste.js");
var mongoose = require("mongoose");
var fs = require("fs");
const multer = require("multer");

exports.newPost = async (req, res, next) => {
  try {
    const postUser = new NewPostUser({
      userId: req.body.userId,
      nom: req.body.nom,
      prenom: req.body.prenom,
      inputTextPost: req.body.inputTextPost,
      datePost: req.body.datePost,
      image: req.file.filename,
    });

    console.log(postUser);
    console.log(req.body.inputTextPost);

    const newPost = await postUser.save();
    return res.json(201).json(newPost);
  } catch (errors) {
    return res.status(405).json({ errors: errors.message });
  }
};

exports.getAllPost = (req, res, next) => {
  NewPostUser.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getPostSelected = (req, res, next) => {
  NewPostUser.findOne({ _id: req.body.idPost }).then((post) => {
    if (!post) {
      return res.status(401).json({ message: "erreur incorrecte" });
    } else {
      res.status(200).json({
        success: "Post trouvé ! ",
        inputTextPost: post.inputTextPost,
        image: post.image,
      });
    }
  });
};

exports.deleteposte = async (req, res, next) => {
  try {
    const deleteposteId = await NewPostUser.findById(req.params.id);
    console.log(deleteposteId);
    await deleteposteId.remove();

    // delete file named 'sample.txt'
    fs.unlink(`images/${deleteposteId.image}`, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log("File deleted!");
    });

    response.status(201).json({ message: "suppression réussie" });
  } catch (e) {
    console.log(req.params.id);
    res.status(404).json({ error: "error !!" });
  }
};

exports.update = (req, res, next) => {
  NewPostUser.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(res.status(200).json({ message: "Post modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.upload2 = async (req, res, next) => {
  try {
    // delete file named 'sample.txt'
    // fs.unlink(`images/${req.body.oldimage}`, function (err) {
    //   if (err) throw err;
    //   // if no error, file has been deleted successfully
    //   console.log("File deleted!");
    // });

    await res.status(201).json({ message: req.file.filename });
  } catch (errors) {
    await res.status(405).json({ errors: errors.message });
  }
};

exports.postlike = (req, res, next) => {
  console.log(req.body.userid[2]);

  switch (req.body.case) {
    //check if the user had liked or disliked the sauce
    //uptade the sauce, send message/error

    case 1:
      NewPostUser.findOne({ _id: req.params.id }).then((post) => {
        if (post.usersLiked.length != 0) {
          console.log("liste des utilisateurs like", post.usersLiked);
          console.log("utlisateur ajouter", req.body.userid[2]);
          for (var i = 0; i < post.usersLiked.length; i++) {
            // Quand l'utilisateur existe déjà (donc like -1)
            if (req.body.userid[2] === post.usersLiked[i]) {
              var searchUserLike = 1;
              // console.log("utilisateur existe -1");
              // Quand l'utilisateur existe pas (donc like +1)
            } else {
              var searchUserLike = 0;
              // console.log("utilisateur existe pas +1");
            }
          }
        } else {
          var searchUserLike = 0;
        }

        console.log("liste des utilisateurs bdd", post.usersLiked);
        post.usersLiked.push(req.body.userid[2]);
        console.log("utlisateur ajouter", post.usersLiked);

        if (searchUserLike == 0) {
          console.log("un like à ajouté");
          likes = post.like + 1;
          NewPostUser.updateOne(
            { _id: req.params.id },
            {
              like: post.like + 1,
              usersLiked: post.usersLiked,
              _id: req.params.id,
            }
          )
            .then(() => {
              res.status(201).json({ likes });
            })
            .catch((error) => {
              res.status(400).json({ error: error });
            });
        } else {
          deleteUser = post.usersLiked.filter((e) => e !== req.body.userid[2]);
          likes = post.like - 1;

          NewPostUser.updateOne(
            { _id: req.params.id },
            {
              like: likes,
              usersLiked: deleteUser,
              _id: req.params.id,
            }
          )
            .then(() => {
              res.status(201).json({ likes });
            })
            .catch((error) => {
              res.status(400).json({ error: error });
            });
        }
      });
      break;
    case -1:
      NewPostUser.findOne({ _id: req.params.id }).then((post) => {
        if (post.usersDisliked.length != 0) {
          console.log("liste des utilisateurs like", post.usersDisliked);
          console.log("utlisateur ajouter", req.body.userid[2]);
          for (var i = 0; i < post.usersDisliked.length; i++) {
            // Quand l'utilisateur existe déjà (donc like -1)
            if (req.body.userid[2] === post.usersDisliked[i]) {
              var searchUserDisLike = 1;
              // console.log("utilisateur existe -1");
              // Quand l'utilisateur existe pas (donc like +1)
            } else {
              var searchUserDisLike = 0;

              console.log("utilisateur existe pas +1");
            }
          }
        } else {
          var searchUserDisLike = 0;
          console.log("ezrz");
        }

        // console.log("liste des utilisateurs bdd", post.usersDisliked);
        post.usersDisliked.push(req.body.userid[2]);
        // console.log("utlisateur ajouter", post.usersDisliked);

        if (searchUserDisLike == 0) {
          console.log("un dislike à ajouté");
          dislikes = post.dislike + 1;
          NewPostUser.updateOne(
            { _id: req.params.id },
            {
              dislike: dislikes,
              usersDisliked: post.usersDisliked,
              _id: req.params.id,
            }
          )
            .then(() => {
              res.status(201).json({ dislikes });
            })
            .catch((error) => {
              res.status(400).json({ error: error });
            });
        } else {
          console.log("un dislike retirer");
          deleteUser2 = post.usersDisliked.filter(
            (e) => e !== req.body.userid[2]
          );
          dislikes = post.dislike - 1;

          console.log(dislikes, "     ", post.dislike);
          console.log(deleteUser2);

          NewPostUser.updateOne(
            { _id: req.params.id },
            {
              dislike: dislikes,
              usersDisliked: deleteUser2,
              _id: req.params.id,
            }
          )
            .then(() => {
              res.status(201).json({ dislikes });
            })
            .catch((error) => {
              res.status(400).json({ error: error });
            });
        }
      });
      break;
  }
};
