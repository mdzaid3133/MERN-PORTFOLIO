import Education from "../models/education.model.js";

const addEducationData = async (req, res, next) => {
    console.log(req.body);
    const { duration, college, marks } = req.body;
    console.log(duration, college, marks);
   
    try {
        // Validate the input
        if (!duration || !college || !marks) {
            return res.status(400).send({ status: false, message: 'All fields are required' });
        }

        // if (typeof marks !== 'number' || marks < 0 || marks > 100) {
        //     return res.status(400).send({ status: false, message: 'Marks must be a number between 0 and 100' });
        // }

        // Create the education data
        const educationData = await Education.create({
            duration: duration,
            college: college,
            marks: marks,
        });

        // Check if the education data was created successfully
        if (!educationData) {
            return res.status(500).send({ status: false, message: 'Failed to add education data' });
        }

        // Send success response
        return res.status(201).send({ status: true, message: 'Education data added successfully', data: educationData });
    } catch (error) {
        console.error('Error adding education data:', error);
        return res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};


const deleteEducation = async (req,res,next)=>{
    try {
        const educationData = await Education.findByIdAndDelete(req.params.id)
        if (!educationData) {
            return res.status(404).json({ status: false, message: 'Education data not found' })
        }
        res.status(200).json({ status: true, message: 'Education data deleted successfully' })
    }catch (error) {
        console.log(error)
        res.status(500).send({status:false, message:"Internal Server Error",})
    }
}
const getEducationData = async(req,res,next)=>{
   
     try {
        
        const educationData = await Education.find({})

        if(!educationData){
            res.status(500).send({status:false, message:'Failed to get education data'})
        }

        res.status(201).send({status:true, message:'Get successfully', data:educationData})
     } catch (error) {
        console.log(error)
        res.status(500).send({status:false, message:"Internal Server Error",})
     }
}



export {addEducationData,getEducationData,deleteEducation,}