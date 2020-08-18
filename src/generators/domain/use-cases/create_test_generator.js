
const get_variables = require('../repository/name_constants');

module.exports = function createUseCaseTestText(domainName){
    const VARIABLES = get_variables(domainName);
    
    return `
    import {expect} from 'chai';
    import { IocContainer } from 'shukshma';
    import {  ${VARIABLES.domainEntityName} } from '../entity/${domainName}.entity'';
    import { ${VARIABLES.domainRepositoryName} } from '../repository/${domainName}.repo';
    import { REPOSITORY_TYPES } from '../../../util/types/repository.types';
    import { Create${domainName} } from './${"create" + domainName }';
 
    
    describe('Create ${domainName} Use Case', () => {
        let storage:${VARIABLES.domainRepositoryName};
        let added${domainName}:${VARIABLES.domainEntityName};
        const CONSTANTS = {
        // YOUR CONSTANTS GO HERE EG.ENITITY PROPERTIES FOR ENTITY CLASS INSTANTIATION ETC.
        }
        before('Create Instance of the ${VARIABLES.domainRepositoryName}',()=>{
            storage = <${VARIABLES.domainRepositoryName}> IocContainer.get_ioc_container().get<${VARIABLES.domainRepositoryName}>(REPOSITORY_TYPES.${VARIABLES.domainRepositoryName});
        });
    
    
        it('Should add ${domainName}',async ()=>{
            const add${domainName} = new Create${domainName}(storage);
            added${domainName} = await add${domainName}.execute({
            // ADD THE FIELDS HERE FROM "CONSTANTS" OBJECT    
            });
            expect(added${domainName}._ACTUAL_PROPERTY).to.be.equal(CONSTANTS._EXPECTED_PROPERTY);
        });
    
        after('Remove the ${domainName}',async()=>{
            await storage.remove(String(added${domainName}._id));
        })
    })
    
    
`
}