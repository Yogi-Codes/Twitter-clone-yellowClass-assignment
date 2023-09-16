import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import handleError from "../error.js";

export  const signup = async (req,res,next)=>{

 
    try {

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({... req.body,password:hash});

        await newUser.save();
        const {password,...rest} = newUser._doc;
        
        const token = jwt.sign({id: newUser._id},process.env.JWT);
     res.status(200).json({ token: token, ...rest });
    } catch (error) {
        next(error)
    }

};

export  const signin = async (req,res,next)=>{
  
    try {
    const user = await User.findOne({username:req.body.username})
    if(!user){
        return next(handleError(404,"User Not Found!"))
    }

     const match = await bcrypt.compare(req.body.password,user.password)
     if(!match){
        return next(handleError(400,"Wrong Password!"));

     }

     const token =await jwt.sign({id: user._id},process.env.JWT);
     const {password,...rest} = user._doc;
     
     res.status(200).json({ token: token, ...rest });

    } catch (error) {
        next(error)
    }

};