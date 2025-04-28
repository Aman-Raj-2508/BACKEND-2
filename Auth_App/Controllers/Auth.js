const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

//For login route handler

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; //destructuring the data from request body
        //validate the data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        //if validation is successful, check if user exists in db
        let user = await userModel.findOne({ email }); //findOne method is used to find the first document that matches the query. If no document is found, it returns null else it returns the document.
        //if user is not found, return error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        const payload = {
            id: user._id, //user id ko payload me daal rahe hai
            name: user.name,
            email: user.email,
            role: user.role
        }
        //verify password using bcrypt and generate JWt token 
        if (await bcrypt.compare(password, user.password)) {

            //password is correct, generate token
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" }); //token ko sign kar rahe hai using jwt.sign method. 1st argument is payload, 2nd is secret key, 3rd is options.

            user = user.toObject(); //user ko object me convert kar rahe hai taaki hum usme token daal sake.
            user.token = token; //token ko user object me daal rahe hai na ki database me save kar rahe hai.
            user.password = undefined; //password ko undefined kar rahe hai taaki password na dikhe response me.Hum database me undefined nhi kr rhe hai hm User object me kar rhe hn jo dinOne return kar raha hai.

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 30000), // Expiry in 3 days
                httpOnly: true,  // Prevent client-side access
            };


            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Login successful",
                user,
                token,
            });


        } else {
            return res.status(403).json({
                success: false,
                message: "Invalid credentials",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}