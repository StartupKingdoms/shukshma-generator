const strman = require('strman');

module.exports = function createUseCaseText(domainName) {
    return `
import {${domainName+"Entity"}} from '../entity/${domainName}.entity';
import { ${domainName+"Repository"} } from "../repository/${domainName}.repo";
import { REPOSITORY_TYPES } from "../../../util/types/repository.types";

interface GetAll${domainName}Params{
    // TODO: ADD FIELDS THAT YOU NEED IN EXECUTE FUNCTION
}

export class GetAll${domainName} {

    private storage:${domainName+"Repository"} ;

    constructor(storage:${domainName+"Repository"}) {
            this.storage = storage;
    }

    async execute(){
        let result = await this.storage.findAll({
            // FILTER PROPERTIES
        });
        return result ;
    }
}
    `
}