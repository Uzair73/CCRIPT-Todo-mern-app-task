const express= require('express'); // import express js
const users = require('../Models/User.js'); // import userschema model
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var jwt = require('jsonwebtoken');  //import json web token
var fetchusers = require('../middleware/fetchusers')
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.

//Router 1) create a user using post request: /api/auth/signup : no login required
router.post('/signup',[
   // name must be at least 3 chars long
   body('name','Name must be atleast 3 charaters').isLength({ min: 3 }),
   // password must be at least 5 chars long
   body('password','Password must be atleast 5 charaters').isLength({ min: 5 }),
   // username must be an email
   body('email', 'Enter a valid Email').isEmail(),
] , async (req,res) =>{
    let success = false;
// Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  // IF there are errors, sending bad request
    if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
}
try {
  //To check the user that this email alreday exists or not.
let user = await users.findOne({email:req.body.email});
if (user) { //if users already exits sending bad request
  return res.status(400).json({success,error: "Sorry this email already exists"});
}
// addign a bcrypt salt to protect users passwords
const webtoken = '554$0@32'
const salt = await bcrypt.genSalt(10); //Generating a password hash
const secpass = await bcrypt.hash(req.body.password,salt)
 user = await users.create({
  name: req.body.name,
  email: req.body.email,
  password: secpass,
})
const data = {
  user :{
    id: user.id
  }
} 
console.log(data)
const authtoken = jwt.sign(data,webtoken,{ noTimestamp:true, expiresIn: '24h'});
success = true;
res.json({success,authtoken})
} catch (error) {
  console.error(error.message)
  res.status(500).send('Internal Server Error')
}
})

//Router 2)Login a user using post request: /api/auth/login : no login required
router.post('/login',[
  // password must be at least 5 chars long
  body('password','Password must be atleast 5 chara long').isLength({ min: 5 }),
  // username must be an email
  body('email', 'Enter a valid Email').isEmail(),
] , async (req,res) =>{
  let success = false;
// Finds the validation errors in this request and wraps them in an object with handy functions
const errors = validationResult(req);
// IF there are errors, sending bad request nad errors
  if (!errors.isEmpty()) {
  return res.status(400).json({errors: errors.array() });
}
const webtoken = '554$0@32'
const {email,password} = req.body;
try {
  let user = await users.findOne({email})
  if(!user){
    return res.status(400).json('Please try to login using correct credentials')
  }
  const validPass = await bcrypt.compare(password,user.password)
  if(!validPass){
     return res.status(400).json("Please try to login using correct credentials")
  }
  const data = {
    user :{
      id: user.id
    }
  }
  console.log(data)
  success = true;
  const authtoken = jwt.sign(data,webtoken,{ noTimestamp:true, expiresIn: '24h'});
  res.json({success,authtoken})
}
catch (error) {
  console.error(error.message)
  res.status(500).send('Internal Server Error')
}
})
//Router 3)Get a user  details using post request: /api/auth/login :login required
router.get('/userdetails/:id',fetchusers, async (req,res) =>{
try {
  const id = req.params.id
  console.log('id', id)
  const user = await users.findById(id).select('-password');
  res.status(200).json({ user });
}
catch (error) {
  console.error(error.message)
  res.status(500).send('Internal Server Error')
}
})
module.exports = router