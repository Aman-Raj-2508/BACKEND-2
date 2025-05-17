const express = require("express");
const router = express.Router();


//require controllers
const { imageUpload, videoUpload, imageSizeReducer, localFileUpload } = require("../controllers/fileUploadControllers");

//api routes
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;