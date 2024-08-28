import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        skillName: { type: String, required: true },
        skillSection: { type: String, required: true },
        skillImage: {
            public_id: { type: String },
            secure_url: { type: String },
        }
    }

)

const Skill = mongoose.model("Skill", skillSchema);
export default Skill