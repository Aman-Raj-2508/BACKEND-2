//import the model 
const Todo = require("../models/Todo");

//define route handler
exports.updateTodo = async (req, res) => { // we have written async function because here it is a database call and it is mandatory to write like this. This syntax does'nt block the other code executions. This the syntax exports.createTodo.
    try {
        // fetch the id
        const { id } = req.params;
        const { title, description } = req.body;

        const updateTodo = await Todo.findByIdAndUpdate(
            { _id: id },
            { title, description, updatedAt: Date.now() },
        )
        res.status(200).json(
            {
                success: true,
                data: updateTodo,
                message: 'updated successfully'
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