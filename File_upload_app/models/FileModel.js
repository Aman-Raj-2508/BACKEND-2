const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});


//post middleware
fileSchema.post('save', async function (doc) {
    try {

        console.log("File saved successfully", doc);
        //Node mailer ka setup, first we need to create a transporter
        const transporter = nodemailer.transporter({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        //send mail
        let info = await transporter.sendMail({
            from: `Aman`,
            to: doc.email,
            subject: "File Upload Confirmation",
            text: `Your file ${doc.name} has been uploaded successfully.`
        });

    }
    catch (error) {

        console.error("Error in sending email", error);
    }
});






const FileModel = mongoose.model('File', fileSchema);
module.exports = FileModel;