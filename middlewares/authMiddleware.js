import JWT from  'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected routes token base
export const requireSignIn = async(req, res, next)=>{
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        // console.log("requireSignIn is working")
        // console.log(req.user)
        next();
    } catch(error){
        console.log(error);
        res.send("problem at requireSignIn")
    }
};

export const isAdmin = async (req, res, next)=>{

    try {
        const user = await userModel.findById(req.user._id)
        if (user.role!==1){
            return res.status(401).send({
                ok:false,
                success:false,
                message : 'UnAuthorized Access'
            })
        } else{
            next();
        }
    } catch(error){
        console.log(error);
        res.send("error at isAdmin")
    }
}