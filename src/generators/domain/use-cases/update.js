const strman = require('strman');

module.exports = function createUseCaseText(domainName) {
    return `
import {${domainName+"Entity"}} from '../entity/${domainName}.entity';
import {IocContainer} from '../../../lib/IOC/ioc_container';
import { ${domainName+"Repository"} } from "../repository/${domainName}.repo";
import { REPOSITORY_TYPES } from "../../../util/types/repository.types";


export class Update${domainName} {

    private storage:${domainName+"Repository"} ;

    constructor() {
            this.storage = IocContainer.get_ioc_container().get<${domainName+"Repository"}>(REPOSITORY_TYPES.${domainName+"Repository"});
    }

    async execute(...args){
        let ${strman.toCamelCase(domainName+"Entity")} = new  ${domainName+"Entity"}(...args);
        let result = await this.storage.update(${strman.toCamelCase(domainName+"Entity")});
        return result ;
    }
}
    `
}