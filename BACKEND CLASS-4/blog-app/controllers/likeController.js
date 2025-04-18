// import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//likepost controller
exports.likePost = async (req, res) => {
    try {
        const { postId, user } = req.body;
        const like = new Like({
            postId, user
        });
        const savedLike = await like.save();

        // console.log(savedLike._id); 

        const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { likes: savedLike._id } }, { new: true })//savedCommment._id karne se comment ka jo id bana hoga by default db me woh push ho jyega comment wale array me jo POST wale db me hai.updated Document chahiye isiliye new ko true kar diye.
            .populate("likes") // populates the comments array of post with comment document.
            .exec();

        res.status(200).json({
            post: updatedPost
        })


    }
    catch (error) {
        return res.status(500).json({
            error: "Error while creating like",
        })

    }
}


// unlike postcontroller
exports.unlikePost = async (req, res) => {
    try {

        const { postId, likeId } = req.body;
        //find by id and delete from likes collection
        const deletedLike = await Like.findOneAndDelete({ postId: postId, _id: likeId }) //jis bhi pehli entry ke andar yeh dono parameter match kar jayenge usko delte kr do.
        //update the post collectionposds
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: deletedLike._id } },
            { new: true }
        );

        res.status(200).json({
            post: updatedPost
        })


    } catch (error) {
        return res.status(500).json({
            error: "Error while deleting like",
        })

    }

}
