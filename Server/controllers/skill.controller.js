import Skill from "../models/skill.model.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const addSkillData = async(req,res,next)=>{
    const {skillName,skillSection} = req.body;
   
     try {
        if(!skillName || !skillSection){
            res.status(404).send({status:false, message:'all fields are required'})
        }
        const skillData = await Skill.create({
           skillName: skillName,
           skillSection: skillSection,
           skillImage: {
            public_id: "dummy",
            secure_url: "dummy",
        }
        })


        // Check if there is an image file to upload
        if (req.file) {
            try {
               const skillImageUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                  folder: 'skill_images',
               });
   
               if (skillImageUploadResult) {
                skillData.skillImage = {
                     public_id: skillImageUploadResult.public_id,
                     secure_url: skillImageUploadResult.secure_url,
                  };
               }
   
               // Delete the file from the server after uploading
               await fs.rm(req.file.path);
            } catch (err) {
               console.error('Error uploading project image:', err.message);
               return res.status(500).json({ status: false, message: 'Skill image upload failed' });
            }
         }

        if(!skillData){
            res.status(500).send({status:false, message:'Failed to add skill data'})
        }

        skillData.save();

        res.status(201).send({status:true, message:'skill Data added successfully', data:skillData})
     } catch (error) {
        console.log(error)
        res.status(500).send({status:false, message:"Internal Server Error",})
     }
}

 const deleteSkill = async (req, res) => {
     try {
        const skillId = req.params.id;
        const deletedskillData = await Skill.findByIdAndDelete(skillId);
        
        if(!deletedskillData){
            res.status(404).send({status:false, message:'Skill not found'})
        }
        res.status(200).send({status:true, message:'Skill deleted successfully'})
     } catch (error) {
       console.log(error)
       res.status(500).send({status:false, message:"Internal Server Error",})
     }
 }

const getSkillData = async(req,res,next)=>{
   
     try {
        
        const skillData = await Skill.find({})

        if(!skillData){
            res.status(500).send({status:false, message:'Failed to get skill data'})
        }

        res.status(201).send({status:true, message:'Get successfully', data:skillData})
     } catch (error) {
        console.log(error)
        res.status(500).send({status:false, message:"Internal Server Error",})
     }
}

export {addSkillData,getSkillData,deleteSkill}