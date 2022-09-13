const NewPostUser = require("../models/poste.js");

exports.newPost = async (req, res, next) => {
  const postUser = new NewPostUser({
    userId: req.body.userId,
    nom: req.body.nom,
    prenom: req.body.prenom,
    inputTextPost: req.body.inputTextPost,
    datePost: req.body.datePost,
    image: req.file.filename,
  });
  console.log(req.file.filename);

  try {
    const newPost = await postUser.save();
    res.json(201).json(newPost);
  } catch (errors) {
    res.status(405).json({ errors: errors.message });
  }
};

exports.getAllPost = (req, res, next) => {
  NewPostUser.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteposte = async (req, res, next) => {
  try {
    const deleteposteId = await NewPostUser.findById(req.params.id);
    await deleteposteId.remove();
    res.send({ data: true });
  } catch (e) {
    res.status(404).json({ error: "error !!" });
  }
};

exports.update = async (req, res, next) => {
  try {
    const update = await NewPostUser.findById(req.params.id);
    await update.updateOne({
      ...req.body,
    });
    res.send({ data: true });
  } catch (e) {
    res.status(404).json({ error: "error !!" });
  }
};

// const posteObject = JSON.parse(req.body.post);
// console.log(req.body);
// const post = new NewPostUser({
//   ...req.body,
//   UrlImage: `/images/${req.file.filename}`,
//   datePost: new Date(),
// });
// post
//   .save()
//   .then(() => {
//     res.status(201).json({ message: "Objet enregister" });
//   })
//   .catch((error) => {
//     res.status(400).json({ error });
//   });
