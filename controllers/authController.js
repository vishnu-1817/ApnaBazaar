import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';


export const registerController=async (req, res)=>{

    try{

        const {name, email, password, phone, address} = req.body;

        if (!name){
            return res.send({error:'Name is required'})
        }
        if (!email) {
            return res.send({ error: 'Email is required' })
        }
        if (!password) {
            return res.send({ error: 'Password is required' })
        }
        if (!phone) {
            return res.send({ error: 'Phone is required' })
        }
        if (!address) {
            return res.send({ error: 'Address is required' })
        }

        // check user
        const existingUser = await userModel.findOne({email})

        if (existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Registered, please login'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name, email, phone, address, password: hashedPassword}).save()

        res.status(201).send({
            success :true,
            message:'User Registered Successfully',
            user
        })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
};

export const loginController = async(req, res)=>{
    try {
        const {email, password}= req.body;

        // validation
        if (!email || !password){
            return res.status(404).send({
                success:false,
                message:"INVALID EMAIL or PASSWORD"
            })
        }
        const user = await userModel.findOne({email});
        
        // check user
        if (!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match){
            return res.status(200).send({
                success:false,
                message:"Wrong Password"
            })
        }

        const token =  JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn :"7d"});

        res.status(200).send({
            success:true,
            message:"Login successful",
            user:{
                name : user.name,
                email : user.email,
                phone : user.phone,
                role: user.role,
                address : user.address, 
            

            },
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message :'Error in login',
            error
        })
    }
};


// test controller
export const testController =(req, res)=>{
    res.send("protected route")
}
