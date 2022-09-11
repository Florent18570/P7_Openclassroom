const express = require("express");
const router = express.Router();
const poste = require("../controllers/poste");
const multer = require("../middleware/multer-config");

router.post("/newpost", multer, poste.newPost);
router.get("/getpost", poste.getAllPost);

module.exports = router;
