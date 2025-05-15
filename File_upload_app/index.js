//app create
const express = require('express');
const app = express();

//port find karna hai
require('dotenv').config();
const port = process.env.PORT || 3000;

//middlewares add karna hai
app.use(express.json());

//require fileupload middleware
const fileUpload = require('express-fileupload');
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }
));


//db se connect
const dbconnect = require('./config/database');
dbconnect();

//cloud connect
const cloudinary = require('./config/cloudinary');
cloudinary.connect();

//mount api routes
const upload = require('./routes/FileUploadRoutes')
app.use('/api/v1/upload', upload);

//activate server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});