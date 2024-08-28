import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    summary: { type: String, required: true },
    position: { type: String, required: true },
    gitHubLink: { type: String, required: true },
    linkdinLink: { type: String, required: true },
    letCodeLink: { type: String, required: true },
    instagramLink: { type: String, required: true },
    homeImage: {
        public_id: { type: String, },
        secure_url: { type: String, },
    },
    
})

const Home = mongoose.model("Home", homeSchema);
export default Home;