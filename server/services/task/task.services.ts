import Task from "../../model/task.model";
import Project from "../../model/project.model";
import User from "../../model/user.mode";

class TaskServices {
    async createTask(payload:{}) {
        const response = await Task.create(payload);
        return response;
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