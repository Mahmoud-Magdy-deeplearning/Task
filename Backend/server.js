require("dotenv").config();
var path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/user");
const cookieParser = require("cookie-parser");
const video = require('./routes/video');
var cors = require('cors')
 
connectDB();

const app = express();

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://127.0.0.1:3000'}));

app.use( express.static( 'uploads' ) );


app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  next();
});
//homePage Endpoint
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});
// Upload Endpoint
app.use('/api', video);
//User Endpoint
app.use("/api/user", users);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// http://127.0.0.1:3000/