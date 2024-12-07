import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app =  express();

// cofig server
app.use(cors());
app.use(express.json())
app.use(cookieParser())

// import routes
import userRoute from '../routes/user.routes';

// routes
app.use("/api/v1/users", userRoute)

export default app;