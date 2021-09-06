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
