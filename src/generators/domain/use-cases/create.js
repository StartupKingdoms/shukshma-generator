const strman = require('strman');
const get_variables = require('../repository/name_constants');

module.exports = function createUseCaseText(domainName) {
    const VARIABLES = get_variables(domainName);

    return `
import {${VARIABLES.domainEntityName}} from '../entity/${domainName}.entity';
import { ${VARIABLES.domainRepositoryName} } from "../repository/${domainName}.repo";


interface Create${domainName}Params{
    // TODO: ADD FIELDS THAT YOU NEED IN EXECUTE FUNCTION
}

export class Create${domainName} {

    private storage:${VARIABLES.domainRepositoryName} ;

    constructor(storage:${VARIABLES.domainRepositoryName}) {
            this.storage = storage;
    }

    async execute(data:Create${domainName}Params){
        let ${strman.toCamelCase(domainName+"Entity")} = new  ${VARIABLES.domainEntityName}({
            //PROPERTIES HERE
        });
        let result = await this.storage.save(${strman.toCamelCase(domainName+"Entity")});
        return result ;
    }
}
    `
}