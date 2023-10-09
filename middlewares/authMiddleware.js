import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";


//Protected routes token base
export const requireSignIn = async (req, res, next) => {
  // console.log(req.user)
try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decode;
  next();
} catch (error) {
  console.log(error);
}
};




//admin access

export const isAdmin=async(req,res,next)=>{
  // console.log(req);
   try{
    const user=await userModels.findById(req.user?._id)
    if(user.role!==1){
        return res.status(401).send({
            success:false,
            message:"UnAuthorized Access"
        })
    }
    else{
        next()
    }
   } 
   catch(error){
    console.log(error)
   }
}
