const NewPostUser = require("../models/poste.js");

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
    console.log(req.file.filename);

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
    response.status(201).json({ message: "suppression réussie" });
  } catch (e) {
    console.log(req.params.id);
    res.status(404).json({ error: "error !!" });
  }
};

exports.update = (req, res, next) => {
  const PostObject = req.file
    ? {
        ...JSON.parse(req.body),
        image: req.file.filename,
      }
    : { ...req.body };
  console.log(PostObject);

  NewPostUser.updateOne(
    { _id: req.params.id },
    { ...PostObject, _id: req.params.id }
  )
    .then(res.status(200).json({ message: "Post modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};
