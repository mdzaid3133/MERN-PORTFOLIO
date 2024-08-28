import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    aboutImage: {
        public_id: { type: String, },
        secure_url: { type: String, },
    },

})

const About = mongoose.model("About", aboutSchema);
export default About;