const express = require("express");
const router = express.Router();

//controller chahiye
//importing the controller functions for login and signup
const { login, signup } = require("../controllers/auth")
//importing the auth middleware
const { auth, isStudent, isAdmin } = require("../middlewares/authmiddlewares")


//mapping
router.post("/login", login); //login route
router.post("/signup", signup); //signup route


//Testing protected routes
router.get("/test", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route Test",
    });
});
//protected routes for different roles
router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route for student",
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route for admin",
    });
});



//exporting the router
module.exports = router;