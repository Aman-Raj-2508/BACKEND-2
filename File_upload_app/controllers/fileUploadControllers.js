const File = require('../models/FileModel');
//localfileupload ----> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //like to fetch name , email anything we use req.body but for file we use req.files.file
        const file = req.files.file;
        console.log("FILE AA GAYI JEE -->", file);

    }
    catch (error) {

    }
}