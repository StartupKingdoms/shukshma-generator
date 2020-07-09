module.exports = function createUseCaseText(domainName) {
    return `
import {${domainName+"Entity"}} from '../entity/${domainName}.entity';
import {IocContainer} from '../../../lib/IOC/ioc_container';
import { ${domainName+"Repository"} } from "../repository/${domainName}.repo";
import { REPOSITORY_TYPES } from "../../../util/types/repository.types";


export class Remove${domainName} {

    private storage:${domainName+"Repository"} ;

    constructor() {
            this.storage = IocContainer.get_ioc_container().get<${domainName+"Repository"}>(REPOSITORY_TYPES.${domainName+"Repository"});
    }

    async execute(id){
        let result = await this.storage.delete(id);
        return result ;
    }
}
    `
}