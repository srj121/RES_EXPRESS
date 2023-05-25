const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: true
      
    },
    status: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

