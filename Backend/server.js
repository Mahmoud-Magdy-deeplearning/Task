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
app.use(cors({credentials: true, origin: 'https://task-dhho.onrender.com'}));

app.use( express.static( 'uploads' ) );

//homePage Endpoint
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});
// Upload Endpoint
app.use('/api', video);
//User Endpoint
app.use("/api/user", users);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// http://127.0.0.1:3000/