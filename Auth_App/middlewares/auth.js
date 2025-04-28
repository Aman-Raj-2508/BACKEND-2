//auth,isStudent,isAdmin
//importing the required modules
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        console.log("cookies", req.cookies.token); //cookies ko console me print kar rahe hai.
        console.log("body", req.body.token); //body ko console me print kar rahe hai.
        // console.log("header", req.header("Authorization")); //header ko console me print kar rahe hai.

        //extract JWT token from body
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        //token ko body se uthana hai ya cookies se uthana hai ya phit header se uthana hai. Header se uthate waqt Bearer ko hata kar token ko uthana hai.Kyun ki header me token Bearer ke sath hota hai.Yah ek syntax hai jo sabhi me use hota hai.

        if (!token || token === undefined) { //if token is not found in body or cookies or header, return error
            return res.status(401).json({
                success: false,
                message: "Token not found",
            });
        }

        //verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the token using secret key. Verify method will return the decoded payload if token is valid else it will throw an error.
            console.log(decoded); //decoded payload ko console me print kar rahe hai.
            req.user = decoded; //decoded payload ko request object me daal rahe hai taaki agle middleware me use kar sake.
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        next(); //next middleware ko call kar rahe hai.
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        })
    }
}

//middleware for checking if user is student
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== "Student") { //if user role is not student, return error
            return res.status(401).json({
                success: false,
                message: "Access denied",
            });
        }
        next(); //next middleware ko call kar rahe hai.
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") { //if user role is not admin, return error
            return res.status(401).json({
                success: false,
                message: "Access denied",
            });
        }
        next(); //next middleware ko call kar rahe hai.
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        })
    }

}

