import mongoose ,{Document, Schema} from 'mongoose'

export interface ITask extends Document {
    associatedProjectId: string;
    taskTitle: string;
    taskStartDate: Date;
    taskDueDate: Date;
    taskPriority: "medium" | "urgent" | "low";
    taskStatus: "pending" | "inprocess" | "complete";
    taskNotes: string;
    taskTags: [string];
    taskDescription: string;
    taskAssignorId: Schema.Types.ObjectId;
    taskAssigneeId: Schema.Types.ObjectId;
}

const taskSchema = new mongoose.Schema({
    associatedProjectId: {type: Schema.Types.ObjectId, ref: 'Project'},
    taskTitle: {type: String, required: true},
    taskStartDate: {type: Date, required: true},
    taskDueDate: {type: Date, required: true},
    taskPriority: {
        type: String,
        enum: ["medium", "urgent", "low"],
        default: "medium"
    },
    taskStatus: {
        type: String,
        enum: ["pending", "inprocess", "complete"],
        default: "pending"
    },
    taskNotes: {
        type: String,
        default: ""
    },
    taskTags: [{
        type: String
    }],
    taskDescription: {
        type: String,
        required: true
    },
    taskAssignorId: {type: Schema.Types.ObjectId, ref: 'User'},
    taskAssigneeId: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
