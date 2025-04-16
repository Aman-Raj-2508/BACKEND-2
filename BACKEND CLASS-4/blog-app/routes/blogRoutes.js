const express = require("express");

const router = express.Router();


//import controller
const { createComment } = require("../controllers/CommentController");
const { createPost } = require("../controllers/PostController");





//mapping
router.post("/comment/create", createComment);
router.post("/posts/create", createPost);




//export
module.exports = router;