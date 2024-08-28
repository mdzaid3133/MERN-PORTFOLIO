import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required:true},
    country: { type: String, required:true},
})

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;