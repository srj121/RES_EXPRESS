const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
    
    email: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
      
    }
});

const authUser = mongoose.model('auth', authUserSchema);

module.exports = authUser;

