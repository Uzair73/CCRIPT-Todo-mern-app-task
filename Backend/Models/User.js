const mongoose = require('mongoose');
const  {Schema} = mongoose;

const UserSchema = mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},
    {
        timestamps : true
    }
);
const usermodel = mongoose.model('Users',UserSchema)
module.exports = usermodel;