const get_variables = require('./name_constants');

module.exports = function(domainName){
    const variables = get_variables(domainName);
    const domainEntityName = variables.domainEntityName  ;
    const domainRepositoryName = variables.domainRepositoryName ;
    const dummyInstance = "dummy" + domainName;
    return `
import { ${domainEntityName}} from "../entity/${domainName}.entity";
import { expect } from "chai";
import { IocContainer } from "shukshma";
import { ${domainRepositoryName} } from "./${domainName}.repo";
import { REPOSITORY_TYPES } from "../../../util/types/repository.types";


describe('${domainName} Repository', () => {

    let storage:${domainRepositoryName};
    // TODO: YOUR CONSTANTS FOR ENTITIES GOES HERE
    const CONSTANTS = {
    }
    // TODO: INITIALIZE THE ENTITY
    let ${dummyInstance} = new ${domainEntityName}({
    });

    let saved${domainName}:${domainEntityName};
    before('Create Instance of the ${domainRepositoryName}',()=>{
        storage = <${domainRepositoryName}> IocContainer.get_ioc_container().get<${domainRepositoryName}>(REPOSITORY_TYPES.${domainRepositoryName});
    });

    it('should create a ${domainName} Entity',async()=>{
        saved${domainName} = <${domainEntityName}> await storage.save(${dummyInstance});
        //expect(saved${domainName}.YOUR_ACTUAL_FIELD).to.be.equal(${dummyInstance}.YOUR_EXPECTED_FIELD);
    })


    it('should get ${domainName} by id ',async()=>{
        const fetched${domainName} = await storage.getById(String(saved${domainName}._id));
        //expect(fetched${domainName}.YOUR_ACTUAL_FIELD).to.be.equal(saved${domainName}.YOUR_EXPECTED_FIELD);
    })


    it('should update ${domainName} ',async()=>{
        //saved${domainName}._FIELD_TO_BE_UPDATED = SOME_VALUE;
        const updated${domainName} = await storage.update(saved${domainName});
        //expect(updated${domainName}.YOUR_ACTUAL_FIELD).to.be.equal(saved${domainName}.YOUR_EXPECTED_FIELD);
    })

    it('should delete the ${domainName}',async()=>{
        const deleted${domainName} = <${domainEntityName}> await storage.delete(String(saved${domainName}._id));
        //expect(deleted${domainName}.YOUR_ACTUAL_FIELD).to.be.equal(saved${domainName}.YOUR_EXPECTED_FIELD);
    })

    after('Undo Side effects ',async()=>{
        // TODO: UNDO CHANGES HERE
    })
})

`;
}