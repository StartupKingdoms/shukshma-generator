module.exports = function mongoRepoImplGenerator(domainName) {
    const domainEntityName = domainName+"Entity";
    const domainRepositoryName = domainName+"Repository";
    const domainNameModel = domainName + "Model";
    return `
import { ${domainRepositoryName} } from "./${domainName}.repo";
import {${domainEntityName}} from '../entity/${domainName}.entity';
import {mongoose,getModelForClass} from '@typegoose/typegoose' ;
import { injectable } from "inversify";

@injectable()
export class ${"Mongo"+ domainName +"Repo"} implements ${domainRepositoryName} {

    private ${domainNameModel} = getModelForClass(${domainEntityName}) ;

    constructor(){}


    async getById(id:mongoose.Types.ObjectId):Promise<${domainEntityName}>  {
        throw new Error("Method not implemented.");
    }   
    
    
    async save(instance:${domainEntityName}): Promise<${domainEntityName}>  {
        const { _id: id } = await this.${domainNameModel}.create(instance); 
        const result = await this.${domainNameModel}.findById(id).exec();
        return result;
    }

    
    async update(instance:${domainEntityName}):Promise<${domainEntityName}>{
        throw new Error("Method not implemented.");
    };


    async delete(id:mongoose.Types.ObjectId):boolean{
        throw new Error("Method not implemented.");
    };

    async findAll():Promise<${domainEntityName}[]>{
        let instances = await this.${domainNameModel}.find();
        return instances;
    }

}
    `
}