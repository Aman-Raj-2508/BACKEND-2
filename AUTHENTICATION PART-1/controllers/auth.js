const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

//signup route handler
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;

        //check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //secure password using bcrypt
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10); // do argument jaati hai is hash funciton me 1. password 2. No of rounds.     
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        //create user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        //send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user, //user object ko bhej rahe hai  
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}