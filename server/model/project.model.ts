import mongoose,{Document, Schema} from "mongoose";

export interface IProject extends Document{
    projectName:string;
    projectStartDate:Date;
    projectEndDate:Date;
    projectDescription:string;
    projectManagerId:Schema.Types.ObjectId;
    projectOrgnizationId:Schema.Types.ObjectId;
}

const projectSchema = new Schema<IProject>({
    projectName:{
        type:String,
        required:true
    },
    projectStartDate:{
        type:Date,
        required:true,
        validate: {
            validator: function(value: Date) {
                return value instanceof Date && !isNaN(value.getTime());
            },
            message: 'Date must be in YYYY-MM-DD format'
        }
    },
    projectEndDate:{
        type:Date,
        required:true,
        validate: {
            validator: function(value: Date) {
                return value instanceof Date && !isNaN(value.getTime());
            },
            message: 'Date must be in YYYY-MM-DD format'
        }
    },
    projectDescription:{
        type:String,
        required:true
    },
    projectManagerId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    projectOrgnizationId:{
        type:Schema.Types.ObjectId,
        ref:"Organization",
        required:true
    }
},{timestamps:true})

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
