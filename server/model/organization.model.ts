import mongoose from "mongoose";

export interface IOrganization {
    organizationName: string;
    organizationDescription: string;
    createdBy: string;
}

const organizationSchema = new mongoose.Schema({ 
    organizationName: {
        type: String,
        required: true
    },
    organizationDescription: {
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
