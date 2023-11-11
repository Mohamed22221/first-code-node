const express = require("express");
const { getAllusers, regester, login } = require("../controler/usersControler");
const multer = require("multer");
const { regesterValidator, loginValidator } = require("../validator/users");
const verifyToken = require("../utils/verifyToken");
const sendError = require("../utils/classError");
const { ERROR } = require("../utils/httpStatus");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const typeExt = file.mimetype.split("/")[0];
  if (typeExt !== "image") {
    const error = sendError.create(404, ERROR, {
      avatar: "Must Be An Image",
    });
    return cb(error, false);
  } else {
    cb(null, true);
  }
};
const upload = multer({
  storage,
  fileFilter,
});
router.route("/").get(verifyToken, getAllusers);
router
  .route("/regester")
  .post(upload.single("avatar"), regesterValidator, regester);
router.route("/login").post(loginValidator, login);

module.exports = router;
