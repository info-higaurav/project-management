import Project from "../../model/project.model";
import { CreateProjectType } from "./project.validation";

class ProjectServices{

    async createProject(payload:CreateProjectType){
        const project = await Project.create(payload);
        return project;
    }

    async getProjectlist() {
        const projects = await Project.find({})
            .populate({
                path: "projectManagerId",
                select: "-password -accessToken -refreshToken"
            });
        return projects;
    }

    async myProject (userId:string){
        const project = await Project.find({projectManagerId:userId});
        return project;
    }
    
}

export default ProjectServices;