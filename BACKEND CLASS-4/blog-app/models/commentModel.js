const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, // for id of post
        ref: "Post",// reference to the post model
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


module.exports = mongoose.model("Comment", commentSchema); // Comment Schema kko comment naam se export kar diiya.