const entityGenerator = require('./src/generators/domain/entity/entity_element.console.builder');
const repositoryGenerator = require('./src/generators/domain/repository/repo_generator');
const askDomainName = require('./src/generators/utils/askDomain');
const generateDir = require('./src/generators/utils/generateDir')
const buildDir = __dirname+"/dist/";
const useCaseGenerator = require('./src/generators/domain/use-cases/generate_use_case')


async function Bootstrap(){
    generateDir(buildDir);
    const domainName = await askDomainName();
    const domainDir = buildDir+domainName+"/";
    generateDir(domainDir)
    entityGenerator.init(domainDir,domainName);
    repositoryGenerator.init(domainDir,domainName);
    useCaseGenerator.init(domainDir,domainName);
}

Bootstrap();