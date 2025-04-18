const mongoose = require("mongoose");

//make Schema
const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId, // for id of post
        ref: "Post",// Post schema se reference lekr id nikal lenge
    },
    user: {
        type: String,
        required: true,
    },
});

//export
module.exports = mongoose.model("Like", likeSchema);