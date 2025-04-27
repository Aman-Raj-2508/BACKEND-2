const express = require("express");
const router = express.Router();

//controller chahiye
const { login, signup } = require("../controllers/auth")


//mapping
router.post("/login", login); //login route
router.post("/signup", signup); //signup route

//exporting the router
module.exports = router;