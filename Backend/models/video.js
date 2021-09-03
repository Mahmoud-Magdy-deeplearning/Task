const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const VideoSchema =  new Schema({
 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    filename:{
        type:String
    },
    originalname:{
        type:String
    },    destination:{
        type:String
    },    mimetype:{
        type:String
    },    path:{
        type:String
    },
    size: {
        type: String
    }
}, {timestamps: true})



module.exports = mongoose.model('Video', VideoSchema);

// video.created_at = new Date();
// video.updated_at = new Date();
// video.save(function (err, saved) {
//   try {
//     console.log(err);
//     if (err) throw err.errmsg;

//     res.status(200).json({
//       success: true,
//       message: "Successfully uploaded",
//     });
//   } catch (e) {
//     console.log(e);

//     res.status(500).json({
//       success: false,
//       message: "Something has gone wrong",
//     });
//   }
// });