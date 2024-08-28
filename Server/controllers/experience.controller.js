import Experience from "../models/experience.model.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const addExperiences = async (req, res, next) => {
    console.log(req.body);
    const { expPosition, expjoinData, expleaveData, expworkplace, expworkRole, } = req.body;
    console.log(expPosition, expjoinData, expleaveData, expworkplace, expworkRole,);

    try {
        // Check if required fields are provided
        if (!expPosition || !expjoinData || !expleaveData || !expworkplace || !expworkRole) {
            return res.status(400).send({ status: false, message: 'All fields are required' });
        }

        // Create the education data
        const ExperienceData = await Experience.create({
            expPosition: expPosition,
            expjoinData: expjoinData,
            expleaveData: expleaveData,
            expworkplace: expworkplace,
            expworkRole: expworkRole,
            expImage: {
                public_id: "dummy",
                secure_url: "dummy",
            }
        });

        console.log('file upload>>>>', req.file)

        if (req.file) {
            try {
                const experienceImageUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'experience_images',
                });

                if (experienceImageUploadResult) {
                    ExperienceData.expImage = {
                        public_id: experienceImageUploadResult.public_id,
                        secure_url: experienceImageUploadResult.secure_url,
                    };
                }

                // Delete the file from the server after uploading
                await fs.rm(req.file.path);
            } catch (err) {
                console.error('Error uploading project image:', err.message);
                return res.status(500).json({ status: false, message: 'Project image upload failed' });
            }
        }

        // Check if the education data was created successfully
        if (!ExperienceData) {
            return res.status(500).send({ status: false, message: 'Failed to add experience data' });
        }

        // Save the project data
        await ExperienceData.save();

        // Send success response
        return res.status(201).send({ status: true, message: 'Experience data added successfully', data: ExperienceData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};


const updateExperienceData = async (req, res, next) => {
    const { expPosition, expjoinData, expleaveData, expworkplace, expworkRole, } = req.body;
    const { id } = req.params; // Get the document ID from the route parameters

    console.log(req.body)
    console.log(id)


    try {
        // Validate required fields
        if (!expPosition || !expjoinData || !expleaveData || !expworkplace || !expworkRole) {
            return res.status(400).send({ status: false, message: 'All fields are required' });
        }

        let experiencetImageUploadResult = null;

        // Upload homeImage to Cloudinary if a file is provided
        console.log("myFilesher----", req.files)
        if (req.file) {
            try {
                experiencetImageUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'experience_images',
                });

                // Delete the file from the server after successful upload
                await fs.rm(req.file.path);
            } catch (err) {
                console.error('Error uploading experence image:', err.message);
                return res.status(500).send({ status: false, message: 'Experience image upload failed' });
            }
        }

        // Update homeData entry in your database
        const experiencetData = await Experience.findByIdAndUpdate(
            id, // Use the ID to find the document
            {
                expPosition,
                expjoinData,
                expleaveData,
                expworkplace,
                expworkRole,
                expImage: experiencetImageUploadResult
                    ? {
                        public_id: experiencetImageUploadResult.public_id,
                        secure_url: experiencetImageUploadResult.secure_url,
                    }
                    : undefined, // Don't update if there's no new image
            },
            { new: true, omitUndefined: true } // Return the updated document and ignore undefined fields
        );

        if (!experiencetData) {
            return res.status(404).send({ status: false, message: 'Failed to update experience data. Document not found.' });
        }

        res.status(200).send({ status: true, message: 'Experience Data updated successfully', data: experiencetData });
    } catch (error) {
        console.error('Error updating Project data:', error.message);
        res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};



const deleteExperiences = async (req, res, next) => {
    try {
        const experienceData = await Experience.findByIdAndDelete(req.params.id)
        if (!experienceData) {
            return res.status(404).json({ status: false, message: 'Experience data not found' })
        }
        res.status(200).json({ status: true, message: 'Experience data deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: "Internal Server Error", })
    }
}
const getExperiences = async (req, res, next) => {

    try {

        const experienceData = await Experience.find({})

        if (!experienceData) {
            res.status(500).send({ status: false, message: 'Failed to get experience data' })
        }

        res.status(201).send({ status: true, message: 'Get successfully', data: experienceData })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: "Internal Server Error", })
    }
}



export { addExperiences, getExperiences, deleteExperiences,updateExperienceData }