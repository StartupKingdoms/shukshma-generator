const strman = require('strman');

module.exports = function createUseCaseText(domainName) {
    return `
import {${domainName+"Entity"}} from '../entity/${domainName}.entity';
import { ${domainName+"Repository"} } from "../repository/${domainName}.repo";
import { REPOSITORY_TYPES } from "../../../util/types/repository.types";


interface Get${domainName}Params{
    id:string;
    // TODO: ADD FIELDS THAT YOU NEED IN EXECUTE FUNCTION
}

export class Get${domainName} {

    private storage:${domainName+"Repository"} ;

    constructor(storage:${domainName+"Repository"}) {
        this.storage = storage;
    }

    async execute(data:Get${domainName}Params){
        let result = await this.storage.getById(data.id);
        return result ;
    }
}
    `
}