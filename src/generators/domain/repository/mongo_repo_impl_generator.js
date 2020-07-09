module.exports = function mongoRepoImplGenerator(domainName) {
    return `
import { ${domainName+"Repository"} } from "./${domainName}.repo";
import {${domainName+"Entity"}} from '../entity/${domainName}.entity';
import {mongoose,getModelForClass} from '@typegoose/typegoose' ;
import { injectable } from "inversify";

@injectable()
export class ${"Mongo"+ domainName +"Repo"} implements ${domainName+"Repository"} {

    private ${domainName+"Model"} = getModelForClass(${domainName}) ;

    constructor(){}


    async getById(id:mongoose.Types.ObjectId):Promise<OrganizationType>  {
        throw new Error("Method not implemented.");
    }   
    
    
    async save(instance:${domainName}): Promise<${domainName}>  {
        const { _id: id } = await this.${domainName+"Model"}.create(instance); 
        const result = await this.${domainName+"Model"}.findById(id).exec();
        return result;
    }

    
    async update(instance:${domainName}):${domainName+"Entity"}{
        throw new Error("Method not implemented.");
    };


    async delete(id:mongoose.Types.ObjectId):boolean{
        throw new Error("Method not implemented.");
    };

}
    `
}