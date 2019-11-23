const mongoose = require('mongoose');
const schema = mongoose.Schema;

var userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: String
    },
    password: {
        type: String,
        required: String
    },
    login_count: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);