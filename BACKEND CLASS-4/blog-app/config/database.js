const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABSE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Database connected successfully"))
        .catch((err) => {
            console.error("Database connection failed:");
            console.log(err.message);
            process.exit(1);
        });

}

module.exports = dbConnect;  