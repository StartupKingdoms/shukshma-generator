const entityGenerator = require('./src/generators/domain/entity/entity_element.console.builder');
const repositoryGenerator = require('./src/generators/domain/repository/repo_generator');
const askDomainName = require('./src/generators/utils/askDomain');
const generateDist = require('./src/generators/utils/generateDist')
const buildDir = __dirname+"/dist/";



async function Bootstrap(){
    generateDist(buildDir);
    const className = await askDomainName();
    entityGenerator.init(buildDir,className);
    repositoryGenerator.init(buildDir,className);

}

Bootstrap();