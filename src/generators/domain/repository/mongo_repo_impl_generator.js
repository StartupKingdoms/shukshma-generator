const get_variables = require('./name_constants');

module.exports = function mongoRepoImplGenerator(domainName) {
    const variables = get_variables(domainName);
    const domainEntityName = variables.domainEntityName  ;
    const domainRepositoryName = variables.domainRepositoryName ;
    const domainNameModel = variables.domainNameModel ;
    const domainNameCamelCase = variables.domainNameCamelCase 
    const databaseType = variables.databaseType ;

    return `
import { ${domainRepositoryName} } from "./${domainName}.repo";
import {${domainEntityName}} from '../entity/${domainName}.entity';
import {mongoose,getModelForClass} from '@typegoose/typegoose' ;
import { injectable } from "inversify";

@injectable()
export class ${databaseType+ domainName +"Repo"} implements ${domainRepositoryName} {

    private ${domainNameModel} = getModelForClass(${domainEntityName}) ;

    constructor(){}


    async getById(raw_id:string):Promise<${domainEntityName}>  {
        const id:mongoose.Types.ObjectId = mongoose.Types.ObjectId(raw_id);
        const fetched${domainNameCamelCase} = await this.${domainNameModel}.findById(id);
        return fetched${domainNameCamelCase};
    }   
    
    
    async save(instance:${domainEntityName}): Promise<${domainEntityName}>  {
        const created${domainNameCamelCase} = await this.${domainNameModel}.create(instance); 
        return created${domainNameCamelCase};
    }

    
    async update(instance:${domainEntityName}):Promise<${domainEntityName}>{
        await this.${domainNameModel}.findByIdAndUpdate(instance._id,instance);
        const updated${domainNameCamelCase} = await this.${domainNameModel}.findById(instance._id); 
        return  updated${domainNameCamelCase} ;
    };


    async remove(raw_id:string):Promise<${domainEntityName}>{
        const id:mongoose.Types.ObjectId= mongoose.Types.ObjectId(raw_id)
        const removed${domainNameCamelCase} = await this.${domainNameModel}.findByIdAndRemove(id);
        return removed${domainNameCamelCase};
    };

}
    `
}