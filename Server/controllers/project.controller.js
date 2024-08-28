import Project from "../models/project.model.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const addProjectData = async (req, res, next) => {
   console.log(req.body)
   const { projectName, projectDescription, createDate, teckStack, projectLiveURL, projectLink } = req.body;
   console.log(projectName, projectDescription, createDate, teckStack, projectLiveURL, projectLink)

   if (!projectName || !projectDescription || !createDate || !teckStack || !projectLiveURL || !projectLink) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
   }

   try {
      // Initialize project data
      const projectData = new Project({
         projectName,
         projectDescription,
         createDate,
         teckStack,
         projectLiveURL: projectLiveURL ? projectLiveURL : "",
         projectLink: projectLink ? projectLink : "",
         projectImage: {
            public_id: "project_image",
            secure_url: "https://res.cloudinary.com/dmywzkmbo/image/upload/v1723362747/Event-Image-Not-Found_yt01us.jpg",
         }
      });

      // Check if there is an image file to upload
      if (req.file) {
         try {
            const projectImageUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
               folder: 'project_images',
            });

            if (projectImageUploadResult) {
               projectData.projectImage = {
                  public_id: projectImageUploadResult.public_id,
                  secure_url: projectImageUploadResult.secure_url,
               };
            }

            // Delete the file from the server after uploading
            await fs.rm(req.file.path);
         } catch (err) {
            console.error('Error uploading project image:', err.message);
            return res.status(500).json({ status: false, message: 'Project image upload failed' });
         }
      }

      // Save the project data
      await projectData.save();

      return res.status(201).json({ status: true, message: 'Project data added successfully', data: projectData });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
   }
};

const updatePorjectData = async (req, res, next) => {
   const { projectName, projectDescription, createDate, teckStack, projectLiveURL, projectLink } = req.body;
   const { id } = req.params; // Get the document ID from the route parameters

   console.log(req.body)
   console.log(id)


   try {
      // Validate required fields
      if (!projectName || !projectDescription || !createDate || !teckStack || !projectLiveURL || !projectLink) {
         return res.status(400).send({ status: false, message: 'All fields are required' });
      }

      let projectImageUploadResult = null;

      // Upload homeImage to Cloudinary if a file is provided
      console.log("myFilesher----",req.files)
      if (req.file) {
         try {
            projectImageUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
               folder: 'project_images',
            });

            // Delete the file from the server after successful upload
            await fs.rm(req.file.path);
         } catch (err) {
            console.error('Error uploading project image:', err.message);
            return res.status(500).send({ status: false, message: 'Project image upload failed' });
         }
      }

      // Update homeData entry in your database
      const projectData = await Project.findByIdAndUpdate(
         id, // Use the ID to find the document
         {
            projectName,
            projectDescription,
            createDate,
            teckStack,
            projectLiveURL,
            projectLink,
            projectImage: projectImageUploadResult
               ? {
                  public_id: projectImageUploadResult.public_id,
                  secure_url: projectImageUploadResult.secure_url,
               }
               : undefined, // Don't update if there's no new image
         },
         { new: true, omitUndefined: true } // Return the updated document and ignore undefined fields
      );

      if (!projectData) {
         return res.status(404).send({ status: false, message: 'Failed to update project data. Document not found.' });
      }

      res.status(200).send({ status: true, message: 'Project Data updated successfully', data: projectData });
   } catch (error) {
      console.error('Error updating Project data:', error.message);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
   }
};

const deleteProject = async (req, res) => {
   try {
      const project = await Project.findByIdAndDelete(req.params.id)
      if (!project) {
         return res.status(404).json({ status: false, message: 'Project not found' })
      }
      res.status(200).json({ status: true, message: 'Project deleted successfully' })
   } catch (error) {
      console.error(error)
      res.status(500).send({ status: false, message: "Internal Server Error" })
   }
}


const getProjectData = async (req, res, next) => {

   try {

      const projectData = await Project.find({})

      if (!projectData) {
         res.status(500).send({ status: false, message: 'Failed to get project data' })
      }

      res.status(201).send({ status: true, message: 'Get successfully', data: projectData })
   } catch (error) {
      console.log(error)
      res.status(500).send({ status: false, message: "Internal Server Error", })
   }
}

export { addProjectData, getProjectData, deleteProject,updatePorjectData }