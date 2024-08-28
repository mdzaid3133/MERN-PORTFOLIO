import User from "../models/user.model.js";


const login = async(req,res,next)=>{
   try {
    const {email,password} = req.body;
    console.log(email,password)

    if(!email || !password){
        return res.status(400).json({message:"All fields must be provided"})
    }

     const findUser = await User.findOne({email});

     if(!findUser){
         return res.status(401).json({message:"user not found"})
     }

    const isMatch = findUser.password === password;

    if(!isMatch){
       return res.status(401).json({message:"Invalid credentials"})
    }

    res.status(200).json({message:"user successfully logged in", user: findUser})
   } catch (error) {
     console.log('error', error)
     res.status(500).json({message:"Internal Server Error"})
   }
}

export default login