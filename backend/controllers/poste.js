const NewPostUser = require("../models/poste.js");

exports.newPost = (req, res, next) => {
  // const posteObject = JSON.parse(req.body.post);
  const post = new NewPostUser({
    ...req.body,
    UrlImage: `/images/${req.file.filename}`,
    datePost: new Date(),
  });
  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregister" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });

  // delete posteObject._id;
  // delete posteObject._userId;
  // const postUser = new NewPostUser({
  //   ...posteObject,
  //   datePost: new Date(),
  //   UrlImage: `/images/${req.file.filename}`,
  // });
  // postUser
  //   .save()
  //   .then(() => {
  //     res.status(201).json({ message: "Objet enregister" });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({ error });
  //   });
  // console.log(postUser);

  // postUser
  //   .save()
  //   .then(() =>
  //     res.status(200).json({ message: "envoie des données réussi! " })
  //   )
  //   .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  NewPostUser.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteposte = (req, res, next) => {
  console.log(req.params);
  NewPostUser.deleteOne({ _id: req.body })
    .then(() => {
      res.status(200).json("message: delete success");
    })
    .catch((error) => res.status(400).json({ error }));
};
