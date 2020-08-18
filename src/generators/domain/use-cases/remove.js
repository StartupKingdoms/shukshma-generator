module.exports = function createUseCaseText(domainName) {
    return `
import {${domainName+"Entity"}} from '../entity/${domainName}.entity';
import { ${domainName+"Repository"} } from "../repository/${domainName}.repo";
import { REPOSITORY_TYPES } from "../../../util/types/repository.types";

interface Remove${domainName}Params{
    id:string;
    // TODO: ADD FIELDS THAT YOU NEED IN EXECUTE FUNCTION
}

export class Remove${domainName} {

    private storage:${domainName+"Repository"} ;

    constructor(storage:${domainName+"Repository"}) {
        this.storage = storage;
    }

    async execute(data:Remove${domainName}Params){
        let result = await this.storage.remove(data.id);
        return result ;
    }
}
    `
}