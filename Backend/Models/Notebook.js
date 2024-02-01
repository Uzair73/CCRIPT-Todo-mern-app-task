const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = 'bson';

const NotesSchema = mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        bson : ObjectId,
        ref: "users"
    },
    title:{
        type : String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tags:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
}
);
const notesmodel = mongoose.model('Notes', NotesSchema)
module.exports = notesmodel;