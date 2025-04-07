//import the model 
const Todo = require("../models/Todo");

//define route handler
exports.deleteTodo = async (req, res) => { // we have written async function because here it is a database call and it is mandatory to write like this. This syntax does'nt block the other code executions. This the syntax exports.createTodo.
    try {
        // fetch the id
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json(
            {
                success: true,
                message: 'Todo Deleted'
            }
        );


    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        });
    }

}