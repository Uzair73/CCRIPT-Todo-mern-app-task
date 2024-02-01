const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const mongoURI = "mongodb+srv://uzairhakeem71:Uzair000@note-book-app.mqvrb1j.mongodb.net/Notebookapp"


const connectToMongo = async () => {
      mongoose.connect(mongoURI).then(() => {
        console.log("Connected to Mongodb Successfully!");
      }).catch((error) => {
        console.log(error)
      })
    };
  module.exports = connectToMongo; 