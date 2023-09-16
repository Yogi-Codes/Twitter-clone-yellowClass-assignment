import jwt from "jsonwebtoken";
import handleError from "./error.js";

export const verifyToken = (req,res,next)=>{
const token = req.body.access_token; 


if(!token){


    return next(handleError(401,"You are not allowed to access this resource"));
}

jwt.verify(token,process.env.JWT,(err,user)=>{

    if(err){
        return next(handleError(403,"Token is Invalid"))
    }
    req.user = user;
    next();
})


}

