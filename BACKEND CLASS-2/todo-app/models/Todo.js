const mongoose = require("mongoose") // yaha mongoose ko acees kiye hai aur krna padega schema ke liye

const todoSchema = new mongoose.Schema( //this is the syntax for creating Schema where , it is a object where title, description are keys and {  type: String, required: true, maxLength: 50,}, is value for key title. And inside the title key the values has also key and value pair. Like type , required ,  maxLength all the subkeys for the keys title and so on.

    {
        title: {
            type: String,
            required: true,
            maxLength: 50,
        },
        description: {
            type: String,
            required: true,
            maxLength: 50,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },

    }
);

module.exports = mongoose.model("Todo", todoSchema); ///Yaha hm apne schema ko export kr diye . Aur yeh syntax hai.