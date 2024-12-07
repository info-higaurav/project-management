import mongoose, { Document, Schema } from 'mongoose';

// Interface for User document
interface IUser extends Document {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    isEmailVerified: boolean;
    userRole: "user" | "manager" | "admin" | "developer" | "designer" | "tester" | "product_owner" | "scrum_master";
    phoneNumber: string;
    dateOfBirth: string;
    address: {
        street: string;
        city: string;
        state: string;
        pinCode: string;
        country: string;
    };
    profilePicture: string;
    refreshToken: string;
    accessToken: string;
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    emailAddress: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    userRole: {
        type: String,
        enum: ["user", "manager"],
        default: "user"
    },
    phoneNumber: {
        type: String,
        unique: true,
        default: "",
        sparse: true // Allows empty string values to not trigger unique constraint
    },
    dateOfBirth: {
        type: String,
        default: ""
    },
    address: {
        type: {
            street: {
                type: String,
                default: ""
            },
            city: {
                type: String,
                default: ""
            },
            state: {
                type: String,
                default: ""
            },
            pinCode: {
                type: String,
                default: ""
            },
            country: {
                type: String,
                default: ""
            }
        },
        default: {
            street: "",
            city: "",
            state: "",
            pinCode: "",
            country: ""
        }
    },
    profilePicture: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: ""
    },
    accessToken: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>("User", userSchema, "users");

export default User;
