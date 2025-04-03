//import the model 
const Todo = require("../models/Todo");

//define route handler
exports.createTodo = async (req, res) => { // we have written async function because here it is a database call and it is mandatory to write like this. This syntax does'nt block the other code executions. This the syntax exports.createTodo.
    try {
        //extract title and description from request body.

        const { title, description } = req.body;

        //creates a new todo object and insert in DB.
        const response = await Todo.create({ title, description });
        //send a JSON response with success flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: 'Entry created successfully'
            }
        );
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message
        });
    }

}