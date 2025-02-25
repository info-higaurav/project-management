import User from "../../model/user.model"
import { SignupInput } from "./user.validation";
import { signupSchema } from "./user.validation";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

class UserServices {
  
    async validateSignup (data:SignupInput){
        const result = await signupSchema.parseAsync(data)
        return result
    }

    async validateLogin (data:SignupInput){
        const result = await signupSchema.parseAsync(data)
        return result
    }

    async createUser (data:SignupInput){
        const {password, ...userDate} = data;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({...userDate, password:encryptedPassword});
        const userWithoutPassword = await User.findById(user._id).select('-password');
        return userWithoutPassword;
    }

    async getUser(id:string){
        const response = await User.findById(id).select('-password -accessToken -refreshToken');
        return response;
    }

    async getUsers(){
        const response = await User.find({}).select('-password -accessToken -refreshToken');
        return response;
    }

    async getManagers(){
        const response = await User.find({userRole:'manager'}).select('-password -accessToken -refreshToken');
        return response;
    }

    async verifyPassword (password:String, hashedPassword:String){
        const response = await bcrypt.compare(password as string , hashedPassword as string);
        return response;
    }

    async isUserExists (emailAddress:string){
        const res = await User.find({emailAddress:emailAddress});
        return res;
    }

    async accessToken (userId:string){
        const accessToken = jwt.sign(
            { _id: userId },
            process.env.ACCESS_TOKEN_SECRET || "",
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
        );
        
        await User.findByIdAndUpdate(
            userId,
            { accessToken },
            { new: true }
        );

        return accessToken;
    }

    async refreshToken (userId:string){
        const refreshToken = jwt.sign(
            { _id: userId },
            process.env.REFRESH_TOKEN_SECRET || "",
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
        );

        await User.findByIdAndUpdate(
            userId,
            { refreshToken },
            { new: true }
        );

        return refreshToken;
    } 
}

export {UserServices};