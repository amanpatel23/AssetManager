const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const middleware = require("../../config/middleware");

const usersApi = require("../../controllers/api/users_api");

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "/uploads"));
  },
  filename: function (request, file, cb) {
    const fileName = Date.now() + "-" + parseInt(Math.random() * 1e9) + "-" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = function (request, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.post("/signup", usersApi.signup);
router.post("/signin", usersApi.signin);
router.post("/addalbum", middleware.auth, usersApi.addAlbum);
router.get("/albums", middleware.auth, usersApi.albums);
router.post(
  "/uploadImage",
  upload.single("image"),
  usersApi.uploadImage
);

module.exports = router;
