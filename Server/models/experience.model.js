import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
    {
        expPosition: { type: String, required: true},
        expjoinData: { type: String, required: true},
        expleaveData: { type: String, required: true},  
        expworkplace: { type: String, required: true},  
        expworkRole: { type: String, required: true},  
        expImage:{
            public_id: { type: String, },
            secure_url: { type: String, },
        }
    }
)

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;