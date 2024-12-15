import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app =  express();

// cofig server
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

// import routes
import userRoute from '../routes/user.routes';
import adminRoutes from '../routes/admin.routes';
import managmentRoute from '../routes/managment.routes';

// routes
app.use("/api/v1/users", userRoute)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/managment", managmentRoute)


export default app;