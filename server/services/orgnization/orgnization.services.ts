import Org, { IOrganization } from "../../model/orgnization.model";

class OrganizationServices {

    async createOrganization(payload:IOrganization) {
        const newOrganization = await Org.create(payload);
        return newOrganization;
    }

    async getOrganizations(){
        const organizations = await Org.find({});
        return organizations;
    }

}

export default OrganizationServices;