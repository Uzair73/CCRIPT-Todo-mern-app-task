const express= require('express');
const  router = express.Router();
var fetchusers = require('../middleware/fetchusers')
const Notes = require('../Models/Notebook'); // import userschema model
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.

//Router 1)Get all fetch notes of user using get request: /api/notes/login :login required
router.get('/fetchnotes',fetchusers,async (req,res)=>{
  try {
    const notes = await Notes.find({user_id:req.user.id})
    res.json(notes)
  }catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

//Router 2)Post all fetch notes of user in db using post request: /api/addnotes/login :login required
router.post('/addnotes',fetchusers,[
    // Title must be at least 3 chars long
    body('title','Title must be atleast 3 charaters long').isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('description','Description must be atleast 5 charaters long').isLength({ min: 5 }),
    ], async (req,res)=>{
      try {
 // Finds the validation errors in this request and wraps them in an object with handy functions
 const errors = validationResult(req);
 // IF there are errors, sending bad request
   if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
   }
    const {title,description,tags,user_id} = req.body;
    const note = await new Notes ({
        title,description,tags,user_id
       })
      const savenotes = await note.save();
       res.json(savenotes)
   }catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})


//Router 3)Update & create new notes of user using put request: /api/notes/updatenote:login required
router.put('/updatenotes/:id',fetchusers,async (req,res)=>{
  try {
    const {title,description,tags} = req.body;
    const updatenote = {}
    if(title){updatenote.title = title}
    if(description){updatenote.description = description}
    if(tags){updatenote.tags = tags}
   
    //Find the note to be updated & update it.
    let note = await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send('Not found')
    }
    if(note.user && note.user.toString() !== req.body.id){
      return res.status(401).send('Not Allowed')
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:updatenote},{new:true})
    res.json(note)
  }catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})

//Router 4)Delete the existing notes of user using delete request: /api/notes/deletenote:login required
router.delete('/deletenote/:id',fetchusers,async (req,res)=>{
  try {
    //Find the note to be deleted & delete it.
    let note = await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send('Not found')
    }
    //Allow delection only if the user has its own notes
    if(note.user && note.user.toString() !== req.body._id){
      return res.status(401).send('Not Allowed')
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Note has been deleted" : "Successfully", note: note})
  }catch (error) {
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})
module.exports = router