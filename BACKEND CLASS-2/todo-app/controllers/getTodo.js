//import the model 
const Todo = require("../models/Todo");

//define route handler
exports.getTodo = async (req, res) => { // we have written async function because here it is a database call and it is mandatory to write like this. This syntax does'nt block the other code executions. This the syntax exports.createTodo.
    try {
        //fetch all todo items from database
        const todos = await Todo.find({});

        //response
        res.status(200).json(
            {
                success: true,
                data: todos,
                message: 'Entire Todo Data is fetched'
            }
        );

    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: 'server error',

        })
    }

}

// We can write multiple controllers also inside one
exports.getTodoById = async (req, res) => { // we have written async function because here it is a database call and it is mandatory to write like this. This syntax does'nt block the other code executions. This the syntax exports.createTodo.
    try {
        // fetch id
        const id = req.params.id;
        //fetch all todo items from database on basis of id.
        const todoById = await Todo.findById({ _id: id }); // jaha pe bhi _id ka value id ke equal hai woh item return kar do, _id mongoose database se aaya hai.

        //suppose data for given id is not found
        if (!todoById) {
            return res.status(404).json({
                success: false,
                message: "No data found for id",
            })
        }

        //if data for give id  found
        res.status(200).json({
            success: true,
            data: todoById,
            message: "Data found"
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: 'server error',

        })
    }

}