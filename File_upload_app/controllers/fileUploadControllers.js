const File = require('../models/FileModel');
const cloudinary = require('cloudinary').v2;

//localfileupload ----> handler function
exports.localFileUpload = async (req, res) => {
    try {

        // Step 1 Fetch the file from the request
        //like to fetch name , email anything we use req.body but for file we use req.files.file
        const file = req.files.file;
        console.log("FILE AA GAYI JEE -->", file);


        // Step 2 Create path where file need to be stored on server.
        let path = __dirname + "/files/" + Date.now() + "." + file.name.split('.')[1];
        //1. --dirnmame represents the current directory that is controllers and inside that there is a files folder and inside we have to save the file that is uploaded by the user form his machine . Yeh path server ka path hai jaha par file  save hoga.

        //2. Date.now() ke karan har ek file ka naam unquie hoga and date and time ke eqal hoga. Uske baad hm extension chathe hai file ka isiliye `${file.name.split{"."}[1]}` use kiye hai. Kyun ki file object ke andar ek name key hai jiske andar file ka entension hai.
        console.log("Path -->", path);


        // Step 3 Add path to the move function
        //Agar hame file upload karna hai to Move wala function use karna padega.Move function takes two parameters 1st is the path where we want to save the file and 2nd is a callback function which will be called when the file is moved.
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local File uploaded successfully",
        });


    }
    catch (error) {
        console.log(error);

    }
}

// File upload part 2
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

// file upload to cloudinary
async function uploadFileToCloudinary(file, folder, resourceType = "auto", quality = "auto") {
    const options = {
        folder,
        resource_type: resourceType,
        transformation: [
            { quality: quality } // Use Cloudinary's transformation pipeline
        ]
    };

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload to cloudinary handler
exports.imageUpload = async (req, res) => {
    try {

        //step 1 fetch the data from the request
        const { name, email, tags } = req.body;
        console.log("Name -->", name);
        console.log("Email -->", email);
        console.log("Tags -->", tags);

        const file = req.files.imageFile;
        console.log("File -->", file);

        //step 2 Do the validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        //current file ka extension kya hai usko nikalo
        const fileType = file.name.split(".")[1].toLowerCase();

        //check if the file type is supported or not. For that make a function and call it.
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        //Agr file type supported hai to usko upload kar do.
        const response = await uploadFileToCloudinary(file, "Aman");
        console.log("Response -->", response);

        //db me entry save krni hai.
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,

        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });

    }
}


//video upload to cloudinary handler
exports.videoUpload = async (req, res) => {
    try {
        //fetch data
        const { name, email, tags } = req.body;

        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov"];

        //current file ka extension kya hai usko nikalo
        const fileType = file.name.split(".")[1].toLowerCase();

        //check if the file type is supported or not. For that make a function and call it.
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        //Agr file type supported hai to usko upload kar do.
        const response = await uploadFileToCloudinary(file, "Aman", "video");
        console.log("Vedio Response -->", response);

        //db me entry save krni hai.
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,

        })

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video Successfully uploaded",
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

//image reducer
exports.imageSizeReducer = async (req, res) => {
    try {

        //fetch data
        const { name, email, tags } = req.body;

        const file = req.files.imageFile;

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        //current file ka extension kya hai usko nikalo
        const fileType = file.name.split(".")[1].toLowerCase();

        //Add a limit for the file size
        const maxSize = 1024 * 1024 * 10; // 10MB
        //check if the file type is supported or not. For that make a function and call it.
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            });
        }

        //check if the file size is within the limit
        if (file.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: "File size exceeds the limit",
            });
        }

        //Agr file type supported hai to usko upload kar do.
        const response = await uploadFileToCloudinary(file, "Aman", "image", 30);
        console.log("Response -->", response);

        //db me entry save krni hai.
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,

        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded",
        });




    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}