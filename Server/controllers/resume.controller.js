import Resume from "../models/resume.model.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

// const uploadResume = async (req, res) => {

//    try {
//     const { resumeTitle } = req.body;
//     if (!resumeTitle) {
//         return res.status(404).send({ status: false, message: 'All fields are required' });
//     }

//     const resumeData = await Resume.create({
//         resumeTitle,
//         resumeImage: {
//             public_id: "resume_image",
//             secure_url: "https://res.cloudinary.com/dmywzkmbo/raw/upload/v1723359447/resumes/uhsf9aksgfhjt9n7fs7q.webp",
//         }
//     })

//     if (req.file) {
//        try {
//         const resumeUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
//             folder: 'resume_image',
//         })

//         if(resumeUploadResult){
//             resumeData.resumeImage = {
//                 public_id: resumeUploadResult.public_id,
//                 secure_url: resumeUploadResult.secure_url,
//             }
//         }

//          // Delete the file from the server after uploading
//         await fs.rm(req.file.path);

//        } catch (error) { 
//         console.error('Error uploading project image:', err.message);
//             return res.status(500).json({ status: false, message: 'Resume upload failed' });
//        }
//     }

//     if(!resumeData){
//         res.status(500).json({ status: false, message: 'faild to upload resumer' });
//     }

//      await resumeData.save();

//     return res.status(201).json({ status: true, message: 'Resume  uploaded successfully', data: resumeData });

//    } catch (error) {
//     console.error(error);
//       res.status(500).json({ status: false, message:'internal server error'});
//    }


// }

const getResume = async (req, res) => {
    try {
        const resumeData = await Resume.find({});

        if (!resumeData || resumeData.length === 0) {
            return res.status(404).json({ status: false, message: 'No resume found' });
        }

        res.status(200).json({ status: true, message: 'Resume retrieved successfully', data: resumeData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}


const updateResume = async (req, res) => {
    console.log("hellow")
    try {
        const { id } = req.params;
        const { resumeTitle } = req.body;
        console.log(resumeTitle)

        console.log(req.file)

        let resumeUploadResult = null;

        if (req.file) {
            try {
                resumeUploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'resume_image',
                });

                await fs.rm(req.file.path);

            } catch (err) {
                console.error('Error uploading resume image:', err.message);
                throw new Error('Resume image upload failed');
            }

            const updateResult = await Resume.findByIdAndUpdate(id, {
                resumeTitle,
                resumeImage: {
                    public_id: resumeUploadResult?.public_id,
                    secure_url: resumeUploadResult?.secure_url,
                },
            }, { new: true }); // 'new: true' returns the updated document

            if (!updateResult) {
                return res.status(404).json({ status: false, message: 'Resume not found' });
            }

            return res.status(200).json({ status: true, message: 'Resume updated successfully', data: updateResult });
        } else {
            return res.status(400).json({ status: false, message: 'No file uploaded' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};


export { getResume, updateResume }