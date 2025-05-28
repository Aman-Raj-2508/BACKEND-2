// import model
const Post = require("../models/postModel");

//logic
exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title, body,
        });
        const savedPost = await post.save();//save the post into the db and return the object back abd store it in a savedPost variable.

        res.json({
            post: savedPost,
        })

    }
    catch (error) {
        return res.status(500).json({
            error: "Error while creating post",
        })

    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("comments").exec();//find all the posts and populate the comments field with the comment data.
        //populate is used to get the data from the other collection and exec is used to execute the query.
        res.json({
            posts,
        })

    }
    catch (error) {
        return res.status(500).json({
            error: "Error while getting post",
        })
    }
}