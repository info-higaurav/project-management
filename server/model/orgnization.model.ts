import mongoose from "mongoose";

export interface IOrganization {
    name: string;
    description: string;
    createdBy: string;
}

const organizationSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Organization = mongoose.model<IOrganization>("Organization", organizationSchema);

export default Organization;
