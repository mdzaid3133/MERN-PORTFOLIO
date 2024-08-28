import About from "../models/about.model.js";
import fs from 'fs/promises'
import cloudinary from 'cloudinary'
import path from "path";

const updateAboutData = async (req, res, next) => {
    const { summary, title } = req.body;
    const { id } = req.params;

    try {
        // Check if required fields are provided
        if (!summary || !title) {
            return res.status(400).send({ status: false, message: 'All fields are required' });
        }

        let aboutImageUploadResult = null;

        // Upload aboutImage if provided
        if (req.file) {
            try {
                aboutImageUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'about_images',
                });

                console.log("aboutImageUploadResult", aboutImageUploadResult);

                // Delete the file from the server
                await fs.rm(req.file.path);
            } catch (err) {
                console.error('Error uploading about image:', err.message);
                return res.status(500).send({ status: false, message: 'About image upload failed' });
            }
        }

        // Prepare update fields
        const updateFields = {
            title: title,
            summary: summary,
        }; 

        // Include aboutImage in the update if an image was uploaded
        if (aboutImageUploadResult) {
            updateFields.aboutImage = {
                public_id: aboutImageUploadResult.public_id,
                secure_url: aboutImageUploadResult.secure_url,
            };
        }

        // Update the aboutData in the database
        const aboutData = await About.findByIdAndUpdate(id, updateFields, { new: true });

        // Check if the update was successful
        if (!aboutData) {
            return res.status(500).send({ status: false, message: 'Failed to update about data' });
        }

        // Send success response
        res.status(200).send({ status: true, message: 'About Data updated successfully', data: aboutData });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, message: "Internal Server Error" });
    }
};




const getAboutData = async(req,res,next)=>{
   
     try {
        
        const aboutData = await About.find({})

        if(!aboutData){
            res.status(500).send({status:false, message:'Failed to get about data'})
        }

        res.status(201).send({status:true, message:'Get successfully', data:aboutData})
     } catch (error) {
        console.log(error)
        res.status(500).send({status:false, message:"Internal Server Error",})
     }
}

export {updateAboutData,getAboutData}