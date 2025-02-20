const User = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res)=>{
    try{
        const {email,orgPassword,confirmPassword,role} = req.body;

        if(!email){
            return res.status(400).json({error:true,message:"Please enter email"});
        }
        if(!orgPassword){
            return res.status(400).json({error:true,message:"Please enter password"});
        }
        if(!confirmPassword){
            return res.status(400).json({error:true,message:"Please enter confirm password"});
        }
        if(!role){
            return res.status(400).json({error:true,message:"Please enter role"})
        }

        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({error:true,message:"The user Aldready exist"});
        }

        if(orgPassword !== confirmPassword){
            return res.status(400).json({error:true,message:"Both the password must be same"})
        }
        const hashedPassword = await bcrypt.hash(orgPassword,10);

        const newUser = await User.create({
            email,
            orgPassword : hashedPassword,
            role
        })

        const token = jwt.sign({id:newUser._id,email:newUser.email},"test@123",{expiresIn : "36000m"})
    

        return res.status(200).json({message:"Registration successfully",
            email,
            newUser,
            token,
            role
        });
    }
    catch(err){
        res.status(400).json(err.message);
    }
   
}

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email){
            return res.status(400).json({error:true,message:"Please enter email"});
        }
        if(!password){
            return res.status(400).json({error:true,message:"Please enter password"});
        }
        
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({error:true,message:"User does not exist"});
        }

        const isPasswordValid = await bcrypt.compare(password,existingUser.orgPassword);
        
        if(!isPasswordValid){
            return res.status(400).json({error:true,message:"Invalid password"});
        }

        if(existingUser && isPasswordValid){
            const user = { id: existingUser._id, email: existingUser.email, role: existingUser.role };
            const token = jwt.sign(user,"test@123",{expiresIn:"36000m"});
            return res.status(200).json({error:false,message:"Login successfull",user,token})
        }
        else{
            return res.status(400).json({error:true,message:"Login failed"});
        }
        
    }
    catch(err){
        return res.status(400).json(err.message);

    }
    
}

