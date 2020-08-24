
const get_variables = require('../repository/name_constants');

module.exports = function getUseCaseTestText(domainName){
    const VARIABLES = get_variables(domainName);
    VARIABLES["addedEntity"] = "added"+domainName;

    return `
    import {expect} from 'chai';
    import { IocContainer } from 'shukshma';
    import {  ${VARIABLES.domainEntityName} } from '../entity/${domainName}.entity';
    import { ${VARIABLES.domainRepositoryName} } from '../repository/${domainName}.repo';
    import { REPOSITORY_TYPES } from '../../../util/types/repository.types';
    import { Get${domainName} } from './${"getById" + domainName }';
 
    
    describe('Get ${domainName} Use Case', () => {
        let storage:${VARIABLES.domainRepositoryName};
        let ${VARIABLES.addedEntity}:${VARIABLES.domainEntityName};
        let dummy${domainName}:${VARIABLES.domainEntityName};
        const CONSTANTS = {
        // YOUR CONSTANTS GO HERE EG.ENITITY PROPERTIES FOR ENTITY CLASS INSTANTIATION ETC.
        }
        before('Get Instance of the ${VARIABLES.domainRepositoryName}',()=>{
            storage = <${VARIABLES.domainRepositoryName}> IocContainer.get_ioc_container().get<${VARIABLES.domainRepositoryName}>(REPOSITORY_TYPES.${VARIABLES.domainRepositoryName});
            dummy${domainName} = new ${VARIABLES.domainEntityName}({ 
                // USE PARAMS FROM "CONSTANTS" OBJECT
            })
        });
    
    
        it('Should get ${domainName}',async ()=>{
            const get${domainName} = new Get${domainName}(storage);
            ${VARIABLES.addedEntity} = await storage.save(dummy${domainName})
            let fetched${domainName} = await get${domainName}.execute({id:String(${VARIABLES.addedEntity}._id)});

            expect(fetched${domainName}._ACTUAL_PROPERTY).to.be.equal(CONSTANTS._EXPECTED_PROPERTY);
        });
    
        after('Remove the ${domainName}',async()=>{
            await storage.remove(String(${VARIABLES.addedEntity}._id));
        })
    })
    
    
`
}