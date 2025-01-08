
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {hashPassword, comparePassword} =  require('../helpers/auth.js')
exports.test = (req, res) =>{
  res.json('test is working')
}


exports.signup =  async (req,res) =>{
  console.log(req.body)
   try{
    const {name, email, password} = req.body
    //check if name was entered
    if(!name){
      return res.json({
        error: 'name is required'
      })
    }
    if(!password || password.length < 6){
      return res.json({
        error: 'password is required and should be at least 6 characters long'
      })
    }

    const exist = await User.findOne({email});
    if(exist){
      return res.json({
        error:'email is taken already'
      })
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name, 
      email ,
      password: hashedPassword
    })
    return res.json(user)


   } catch (error){
  console.log(error)
   }
}


exports.login = async (req,res) =>{
try{
const {email, password} = req.body;
const user = await User.findOne({email})
if(!user){
 return res.json({
  error:"No user Found!!!"
 })
}
const match  = await comparePassword(password, user.password);
if(match){
jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) =>{
  if(err) throw err;
  res.cookie('token', token).json(user)
})
}
if(!match){
  res.json({
    error: "passwords do not match"
  })
} 


} catch(error){
  console.log(error)
  }
}


