import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        resumeTitle: { type: String, required: true},  
        resumeImage:{
            public_id: { type: String, },
            secure_url: { type: String, },
        }
    }
)

const Resume= mongoose.model("Resume", resumeSchema);
export default Resume;