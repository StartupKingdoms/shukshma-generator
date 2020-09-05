
import { interfaces } from "inversify-express-utils";

export class CustomPrincipal implements interfaces.Principal{

    constructor(userData:object){
        this.details =userData;
    }

    details: any ; 

    async isAuthenticated(): Promise<boolean> {
        return true;
    }
    
    async isResourceOwner(resourceId: any): Promise<boolean> {
        return true
    }
    async isInRole(role: string): Promise<boolean> {
        return true ;
    }

}