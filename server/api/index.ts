import dotenv from 'dotenv'
import app from './app'
import connectDb from '../services/db';

// Load environment variables from .env file
dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        // Connect to database
        const res = await connectDb();
        console.log(res)
        
        app.get("/", (req, res) => {
            res.send("Hello World");
        }); 
        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (error) {
        // Log error and exit if startup fails
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

start();