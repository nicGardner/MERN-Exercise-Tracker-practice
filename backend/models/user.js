/** 
 * builds a user table in the database from this schema
 * 
*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//defines a schema for users with the following properties: 
// username: which is a string, required, unique, trimmed, and has a min length of 3
//the schema also has timestamps
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    }, 
    {
        timestamps: true,
    },
);

const user = mongoose.model('User', userSchema);

module.exports = user;