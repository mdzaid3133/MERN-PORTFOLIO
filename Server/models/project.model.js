import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    projectName: { type: String, required: true },
    projectDescription: { type: String, },
    createDate: { type: Date, },
    teckStack: { type: String, required: true },
    projectLiveURL: { type: String,},
    projectLink: { type: String,},
    projectImage: {
        public_id: { type: String, },
        secure_url: { type: String, },
    }

})

const Project = mongoose.model("Project", projectSchema);
export default Project;