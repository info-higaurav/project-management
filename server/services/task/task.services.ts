import Task, { ITask } from "../../model/task.model";
import User from "../../model/user.model";

class TaskServices {

    async createTask(payload:{}) {
        const response = await Task.create(payload);
        return response;
    }

    async findTask(payload: Partial<ITask> | any){
        const task = await Task.findOne({
            taskTitle: payload.taskTitle,
            associatedProjectId: payload.associatedProjectId,
            taskAssignorId: payload.taskAssignorId
        });
        return task;
    }

    async getMyTask(taskAssignorId: string) {
        const getUser = await User.findById(taskAssignorId);
       
        if(getUser?.userRole === 'user'){
            const response = await Task.find({taskAssigneeId: taskAssignorId },"-__v")
            .populate('associatedProjectId',"-__v")
            .populate("taskAssignorId", "-password -refreshToken -accessToken -__v")
            .populate("taskAssigneeId", "-password -refreshToken -accessToken -__v");
            return response;
        }
        if(getUser?.userRole === 'manager'){
            const response = await Task.find({taskAssignorId: taskAssignorId },"-__v")
            .populate('associatedProjectId',"-__v")
            .populate("taskAssignorId", "-password -refreshToken -accessToken -__v")
            .populate("taskAssigneeId", "-password -refreshToken -accessToken -__v");
            return response;
        }
        
    }

}

export default TaskServices;