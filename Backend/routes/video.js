const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");


const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");   },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

// Single File Route Handler
router.post("/video", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("Single FIle upload success");
});

module.exports = router;
