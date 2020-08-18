const strman = require('strman');

module.exports = function createUseCaseText(domainName) {
    return `
import {${domainName+"Entity"}} from '../entity/${domainName}.entity';
import { ${domainName+"Repository"} } from "../repository/${domainName}.repo";
import { REPOSITORY_TYPES } from "../../../util/types/repository.types";

interface Update${domainName}Params{
    id:string;
    // TODO: ADD FIELDS THAT YOU NEED IN EXECUTE FUNCTION
}

export class Update${domainName} {

    private storage:${domainName+"Repository"} ;

    constructor(storage:${domainName+"Repository"}) {
        this.storage = storage;
    }

    async execute(data:Update${domainName}Params){
        let ${strman.toCamelCase(domainName+"Entity")} = new  ${domainName+"Entity"}({
            // PROPERTIES TO BE UPDATED
        });
        let result = await this.storage.update(${strman.toCamelCase(domainName+"Entity")});
        return result ;
    }
}
    `
}