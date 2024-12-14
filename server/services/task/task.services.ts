import Task from "../../model/task.model";
import { ITask } from "../../model/task.model";
import Project from "../../model/project.model";
class TaskServices {
    async createTask(payload:{}) {
        const response = await Task.create(payload);
        return response;
    }

    async isProjectValid (projectId:string){
        const response = await Project.findById(projectId)
        return response;
    }

    async getMyTask(taskAssignorId: string) {
        const response = await Task.find({taskAssignorId: taskAssignorId },"-__v")
            .populate('associatedProjectId',"-__v")
            .populate("taskAssignorId", "-password -refreshToken -accessToken -__v")
            .populate("taskAssigneeId", "-password -refreshToken -accessToken -__v");
        return response;
    }
}

export default TaskServices;