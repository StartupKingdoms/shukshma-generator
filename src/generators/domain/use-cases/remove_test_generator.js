
const get_variables = require('../repository/name_constants');

module.exports = function removeUseCaseTestText(domainName){
    const VARIABLES = get_variables(domainName);
    VARIABLES["addedEntity"] = "added"+domainName;

    return `
    import {expect} from 'chai';
    import { IocContainer } from 'shukshma';
    import {  ${VARIABLES.domainEntityName} } from '../entity/${domainName}.entity';
    import { ${VARIABLES.domainRepositoryName} } from '../repository/${domainName}.repo';
    import { REPOSITORY_TYPES } from '../../../util/types/repository.types';
    import { Remove${domainName} } from './${"remove" + domainName }';
 
    
    describe('Remove ${domainName} Use Case', () => {
        let storage:${VARIABLES.domainRepositoryName};
        let ${VARIABLES.addedEntity}:${VARIABLES.domainEntityName};
        let dummy${domainName}:${VARIABLES.domainEntityName};
        const CONSTANTS = {
        // YOUR CONSTANTS GO HERE EG.ENITITY PROPERTIES FOR ENTITY CLASS INSTANTIATION ETC.
        }
        before('Remove Instance of the ${VARIABLES.domainRepositoryName}',()=>{
            storage = <${VARIABLES.domainRepositoryName}> IocContainer.get_ioc_container().get<${VARIABLES.domainRepositoryName}>(REPOSITORY_TYPES.${VARIABLES.domainRepositoryName});
            dummy${domainName} = new ${VARIABLES.domainEntityName}({ 
                // USE PARAMS FROM "CONSTANTS" OBJECT
            })
        });
    
    
        it('Should remove ${domainName}',async ()=>{
            const remove${domainName} = new Remove${domainName}(storage);
            ${VARIABLES.addedEntity} = await storage.save(dummy${domainName})
            let removed${domainName} = await remove${domainName}.execute({id:String(${VARIABLES.addedEntity}._id)});;

            expect(removed${domainName}._ACTUAL_PROPERTY).to.be.equal(CONSTANTS._EXPECTED_PROPERTY);
        });
    })
    
    
`
}