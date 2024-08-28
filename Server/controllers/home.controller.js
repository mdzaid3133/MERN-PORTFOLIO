import Home from "../models/home.model.js";
import path from 'path'
import fs from 'fs/promises'
import cloudinary from 'cloudinary'

const updateHomeData = async (req, res, next) => {
    const { heading, summary, position, gitHubLink, linkdinLink, letCodeLink, instagramLink } = req.body;
    const { id } = req.params; // Get the document ID from the route parameters

    console.log(req.body)
    console.log(id)


    try {
        // Validate required fields
        if (!heading || !summary || !position || !gitHubLink || !linkdinLink || !letCodeLink || !instagramLink) {
            return res.status(400).send({ status: false, message: 'All fields are required' });
        }

        let homeImageUploadResult = null;

        // Upload homeImage to Cloudinary if a file is provided
        if (req.file) {
            try {
                homeImageUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'home_images',
                });

                // Delete the file from the server after successful upload
                await fs.rm(req.file.path);
            } catch (err) {
                console.error('Error uploading home image:', err.message);
                return res.status(500).send({ status: false, message: 'Home image upload failed' });
            }
        }

        // Update homeData entry in your database
        const homeData = await Home.findByIdAndUpdate(
            id, // Use the ID to find the document
            {
                heading,
                summary,
                position,
                gitHubLink,
                linkdinLink,
                letCodeLink,
                instagramLink,
                homeImage: homeImageUploadResult
                    ? {
                        public_id: homeImageUploadResult.public_id,
                        secure_url: homeImageUploadResult.secure_url,
                    }
                    : undefined, // Don't update if there's no new image
            },
            { new: true, omitUndefined: true } // Return the updated document and ignore undefined fields
        );

        if (!homeData) {
            return res.status(404).send({ status: false, message: 'Failed to update home data. Document not found.' });
        }

        res.status(200).send({ status: true, message: 'Home Data updated successfully', data: homeData });
    } catch (error) {
        console.error('Error updating home data:', error.message);
        res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};



const getHomeData = async (req, res, next) => {

    try {

        const homeData = await Home.find({})

        if (!homeData) {
            res.status(500).send({ status: false, message: 'Failed to get home data' })
        }

        res.status(201).send({ status: true, message: 'Get successfully', data: homeData })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: "Internal Server Error", })
    }
}

export { updateHomeData, getHomeData }