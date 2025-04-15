const mongoose = require("mongoose");

//make Schema
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, // for id of post
        ref: "Post",//  Post schema se reference lekr id nikal lenge
    },
    user: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});

//export
module.exports = mongoose.model("Comment", commentSchema); // Comment Schema ko comment naam se export kar diya.