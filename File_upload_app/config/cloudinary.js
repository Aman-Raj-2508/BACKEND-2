const cloudinary = require('cloudinary').v2; // require('cloudinary').v2 is used to import the cloudinary library

//another method to export a funciton without writing module.exports
exports.connect = () => {
    try {

        //Cloduinary.config  is usedd to establise a connection with the cloudinary.
        //it require three parameters.
        //1. cloud_name
        //2. api_key
        //3. api_secret
        //these three parameters are stored in the .env file.
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log('Cloudinary connected successfully');

    } catch (error) {
        console.log('Cloudinary connection failed');
        console.log(error);
        process.exit(1);
    }
}