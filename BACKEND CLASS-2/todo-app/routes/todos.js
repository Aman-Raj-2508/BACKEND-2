//we need express for routes
const express = require("express");

//we need router for creating routes
const router = express.Router();

//import controller
const { createTodo } = require("../controllers/createTodo");
const { getTodo, getTodoById } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");

//define API routes

//we need to created a todo therefore Post request
router.post("/createTodo", createTodo); // here the first one is route and sencond one is controller
router.get("/getTodos", getTodo);
router.get("/getTodos/:id", getTodoById);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;

