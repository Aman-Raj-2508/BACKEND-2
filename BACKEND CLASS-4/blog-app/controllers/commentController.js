// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//logic


exports.createComment = async (req, res) => {
    try {
        //fetch data from req body
        const { postId, user, body } = req.body;
        //Crate a comment
        const comment = new Comment({
            postId, user, body
        });

        //save  the new  comment into the database
        const savedComment = await comment.save();

        // console.log(savedComment._id); 

        //Find the post By ID and add the new comment into the comment array
        const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } }, { new: true })//savedCommment._id karne se comment ka jo id bana hoga by default db me woh push ho jyega comment wale array me jo POST wale db me hai.
            .populate("comments") // populates the comments array of post with comment document.
            .exec();

        res.json({
            post: updatedPost
        })

    }
    catch (error) {
        return res.status(500).json({
            error: "Error while creating comment",
        })

    }
}