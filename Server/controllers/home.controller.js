import Home from "../models/home.model.js";
import path from 'path'
import fs from 'fs/promises'
import cloudinary from 'cloudinary'

const updateHomeData = async (req, res, next) => {
    const { heading, summary, position, gitHubLink, linkdinLink, letCodeLink, instagramLink } = req.body;
    const { id } = req.params;

    try {
        // Validate required fields
        if (!heading || !summary || !position || !gitHubLink || !linkdinLink || !letCodeLink || !instagramLink) {
            return res.status(400).send({ status: false, message: 'All fields are required' });
        }

        // Find the Home data by ID
        const HomeData = await Home.findById(id);
        if (!HomeData) {
            return res.status(404).send({ status: false, message: 'Home data not found' });
        }

        let homeImageUploadResult = null;

        // Check if there's a new file to upload
        if (req.file) {
            try {
                const currentImageId = HomeData.homeImage?.public_id;

                // If an existing image exists, delete it from Cloudinary
                if (currentImageId) {
                    await cloudinary.v2.uploader.destroy(currentImageId, (error, result) => {
                        if (error) {
                            console.error('Error deleting old image:', error);
                            return res.status(500).send({ status: false, message: 'Failed to delete old image' });
                        }
                    });
                }

                // Upload the new image to Cloudinary
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

        // Prepare the data to update
        const homeData = {
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
                : undefined, // Retain old image if no new image was uploaded
        };

        // Update the Home data in the database
        const updatedData = await Home.findByIdAndUpdate(
            id, // Use the ID to find the document
            homeData,
            { new: true, omitUndefined: true } // Return the updated document and ignore undefined fields
        );

        res.status(200).send({ status: true, message: 'Home Data updated successfully', data: updatedData });
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