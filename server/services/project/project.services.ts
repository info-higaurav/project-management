import Project from "../../model/project.model";
import { CreateProjectType } from "./project.validation";

class ProjectServices{

    async createProject(payload:CreateProjectType){
        const project = await Project.create(payload);
        return project;
    }
}

export default ProjectServices;