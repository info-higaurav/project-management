import Org, { IOrganization } from "../../model/organization.model";
import { organizationValidation } from "./organization.validation";
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
        const validatedOrganization = organizationValidation.parse(payload);
        return validatedOrganization;
    }

}

export default OrganizationServices;