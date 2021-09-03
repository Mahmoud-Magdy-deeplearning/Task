const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");

const jwt = require("jsonwebtoken");
const jwtdecode = require("jwt-decode");
const auth = require("../middleware/auth");
const Video = require("../models/video");
const config = require("../config/jwt");
const fs = require('fs')




const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");   },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

// Single File Route Handler
router.post("/video", [upload.single("file"),auth.isAuthenticated ], async (req, res) => {
  const token =
  req.body.token ||
  req.query.token ||
  req.headers["x-access-token"] ||
  req.cookies.token;

if (token) {
  let data = jwtdecode(token);
  
let video = new Video();
// console.log(req)
// console.log(token)
video.user = data.id;
video.originalname = req.file.originalname;
video.mimetype = req.file.mimetype;
video.destination = req.file.destination;
video.filename = req.file.filename;
video.path = req.file.path;
console.log(req.file)
video.size = req.file.size;
console.log("uploaded")

video.save(function (err, saved) {
  try { 
    console.log(err);
    if (err) throw err.errmsg;
console.log("uploaded")
    res.status(200).json({
      success: true,
      message: "Successfully registered",
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({
      success: false,
      message: "Something has gone wrong",
    });
  }
});

console.log(video);
}


  // console.log(req);
});

router.delete("/video/:id", auth.isAuthenticated, async (req, res) => {
try{
  const token =
  req.body.token ||
  req.query.token ||
  req.headers["x-access-token"] ||
  req.cookies.token;

if (token) {
let data = jwtdecode(token);
const id = req.params.id
console.log(Video)
console.log(id)
let item = await Video.findById( id);
if (!item|| item.user!=data.id){ res.status(400).json({
  success: false,
  message: "unauthorized user ",
});
return;
}
item = await Video.findByIdAndDelete( id );
console.log(item)
const path = item.path

  fs.unlinkSync(path)

res.status(200).json({
  success: true,
  message: "Successfully registered",
});
}}
catch(e){
  res.status(500).json({
    success: false,
    message: "Something has gone wrong",
  });
}
});

router.put("/video/:id", auth.isAuthenticated, async (req, res) => {
  try{
    const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
  
  if (token) {
  let data = jwtdecode(token);
  const id = req.params.id
  // console.log(req.body)
  console.log(id)
  let item = await Video.findById( id);
  if (!item|| item.user!=data.id){ res.status(400).json({
    success: false,
    message: "unauthorized user ",
  });
  return;
}
  item = await Video.findByIdAndUpdate( id, req.body, {
    'new': true,
    'runValidators': true,
} );


  res.status(200).json({
    success: true,
    message: "Successfully ",
  });
  }}
  catch(e){
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Something has gone wrong",
    });
  }
  });

  
router.get("/video", auth.isAuthenticated, async (req, res) => {
  try{
    const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
  
  if (token) {
  let data = jwtdecode(token);
  console.log(data.id)
  let item = await Video.find( {"user":data.id}, "originalname filename");
  console.log(item)
  

  res.status(200).json({
    success: true,
    items:item,
    message: "Successfully ",
  });
  }}
  catch(e){
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Something has gone wrong",
    });
  }
  });
    
module.exports = router;
