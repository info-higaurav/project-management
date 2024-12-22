import Org, { IOrganization } from "../../model/organization.model";
import { organizationValidation } from "./organization.validation";
import { ZodError } from 'zod';

class OrganizationServices {

    async createOrganization(payload:IOrganization) {
        const newOrganization = await Org.create(payload);
        return newOrganization;
    }

    async getOrganizations(){
        const organizations = await Org.find({}).populate("createdBy","-password -accessToken -__v -createdAt -refreshToken");
        return organizations;
    }
    async validateOrganization(payload:IOrganization){
        return organizationValidation.parse(payload);
    }
    
    async findOrganization(payload:IOrganization){
        const organization = await Org.findOne({organizationName:payload.organizationName});
        return organization;
    }

}

export default OrganizationServices;
