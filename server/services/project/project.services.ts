import Project, { IProject } from "../../model/project.model";
import { CreateProjectType } from "./project.validation";

class ProjectServices{

    async createProject(payload:CreateProjectType){
        const project = await Project.create(payload);
        return project;
    }

    async findProject(payload:IProject){
        const project = await Project.findOne({projectName:payload.projectName});
        return project;
    }

    async getProjectlist() {
        const projects = await Project.find({})
            .populate({
                path: "projectManagerId",
                select: "-password -accessToken -refreshToken"
            })
            .populate({
                path: "projectOrgnizationId",
                select: "-__v"
            });
        return projects;
    }

    async isProjectValid (projectId:string){
        const response = await Project.findById(projectId)
        return response;
    }

    async myProject (userId:string){
        const project = await Project.find({projectManagerId:userId},"-__v")
        .populate("projectManagerId","-password -__v -refreshToken -accessToken ")
        .populate("projectOrgnizationId","-__v");
        return project;
    }
    
}

export default ProjectServices;