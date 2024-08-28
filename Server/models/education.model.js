import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
    {
        duration: { type: String, required: true},
        college: { type: String, required: true},
        marks: { type: String, required: true},
    }
)

const Education = mongoose.model("Education", educationSchema);
export default Education;