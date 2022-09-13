const express = require("express");
const router = express.Router();

const poste = require("../controllers/poste");

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

router.post("/newpost", upload.single("image"), poste.newPost);
router.get("/getpost", poste.getAllPost);
router.delete("/deletepost/:id", poste.deleteposte);
router.put("/modifier_post/:id", poste.update);

module.exports = router;
