// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//logic
exports.createComment = async (req, res) => {
    try {
        //fetch data from req body
        const { post, user, body } = req.body;
        //Crate a comment
        const comment = new Comment({
            post, user, body
        });

        //save  the new  comment into the database
        const savedComment = await comment.save();

        //Find the post By ID and add the new comment into the comment array
        

    }
    catch (error) {

    }
}