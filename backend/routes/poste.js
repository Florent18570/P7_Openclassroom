const express = require("express");
const router = express.Router();
const poste = require("../controllers/poste");
const auth = require("../middleware/auth");

const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
console.log(fileStorageEngine);

router.post("/newpost", auth, upload.single("image"), poste.newPost);
router.post("/getPostSelected", auth, poste.getPostSelected);
router.get("/getpost", auth, poste.getAllPost);
router.delete("/deletepost:id", auth, poste.deleteposte);
router.put("/modifier_post/:id", poste.update);
router.put("/like/:id", poste.postlike);
router.post("/upload", upload.single("image"), poste.upload2);
router.post("/updateComment/:id", poste.updateCommentaire);
router.delete("/deleteComment/:id", poste.deleteCommentaire);

module.exports = router;
