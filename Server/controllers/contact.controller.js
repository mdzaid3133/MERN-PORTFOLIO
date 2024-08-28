import Contact from "../models/contact.model.js";

const updateContactData = async(req,res,next)=>{
    const {username,email,phone,age,address,country} = req.body;
    const {id} = req.params;

    console.log(username,email,phone,age,address,country)
   
     try {
        if(!username || !email ||!phone || !age || !address || !country){
            res.status(404).send({status:false, message:'all fields are required'})
        }
        
        const updateContactData = await Contact.findByIdAndUpdate(id,{
          username: username,
          email:email,
          phone:phone,
          age:age,
          address:address,
          country:country,
        },{ new: true, omitUndefined: true })

        if(!updateContactData){
            res.status(404).send({status:false, message:'Contact not found'})
        }

        updateContactData.save();

        res.status(201).send({status:true, message:'contact Data updated successfully', data:updateContactData})
     } catch (error) {
        console.lcontactDataog(error)
        res.status(500).send({status:false, message:"Internal Server Error",})
     }
}

const getContactData = async(req,res,next)=>{
   
     try {
        
        const contactData = await Contact.find({})

        if(!contactData){
            res.status(500).send({status:false, message:'Failed to get contact data'})
        }

        res.status(201).send({status:true, message:'Get successfully', data:contactData})
     } catch (error) {
        console.log(error)
        res.status(500).send({status:false, message:"Internal Server Error",})
     }
}

export {updateContactData,getContactData}