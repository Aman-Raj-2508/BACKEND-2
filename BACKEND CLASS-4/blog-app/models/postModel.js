const mongoose = require("mongoose");

//make Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like", //Like schema se reference lekr id nikal lenge
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",  //Comment schema se reference lekr id nikal lenge
    }]
})




//export
module.exports = mongoose.model("Post", postSchema);