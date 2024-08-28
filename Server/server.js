import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongooseConnection from './db/db.js';
import cloudinary from 'cloudinary';

// Import routers here
import homeRouters from './routes/home.route.js';
import aboutRouters from './routes/about.route.js';
import educationRouters from './routes/education.route.js';
import skillRoutes   from './routes/skill.route.js';
import projectRoutes   from './routes/project.route.js';
import contactRoutes   from './routes/contact.route.js';
import experienceRoutes   from './routes/experience.route.js';
import resumeRoutes   from './routes/resume.route.js';
import userRouter   from './routes/user.route.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

//cloudnary seating


// Ensure you are using `v2` to access Cloudinary's uploader and other methods
cloudinary.v2.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_SECRET_KEY,
});




// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Define the port
const PORT = process.env.PORT || 60001;

// Simple route to check server status
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

// Use routes
app.use('/admin/v1', homeRouters);
app.use('/admin/v1', aboutRouters);
app.use('/admin/v1', educationRouters);
app.use('/admin/v1', skillRoutes);
app.use('/admin/v1', projectRoutes);
app.use('/admin/v1', contactRoutes);
app.use('/admin/v1', experienceRoutes);
app.use('/admin/v1', resumeRoutes);
app.use('/admin/v1', userRouter);

// Connect to the database
mongooseConnection();

// Start the server
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});
