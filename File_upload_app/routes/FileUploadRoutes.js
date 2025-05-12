const express = require("express");
const router = express.Router();


//require controllers
const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require("../controllers/FileUploadController");

//api routes
router.post("/localFileUpload", localFileUpload);

module.exports = router;