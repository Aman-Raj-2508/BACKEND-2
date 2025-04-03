//we need express for routes
const express = require("express");

//we need router for creating routes
const router = express.Router();

//import controller
const { createTodo } = require("../controllers/createTodo");

//define API routes

//we need to created a todo therefore Post request
router.post("/createTodo", createTodo); // here the first one is route and sencond one is controller

module.exports = router;

