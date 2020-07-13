const entityGenerator = require('./src/generators/domain/entity/entity_element.console.builder');
const repositoryGenerator = require('./src/generators/domain/repository/repo_generator');
const askDomainName = require('./src/generators/utils/askDomain');
const generateDir = require('./src/generators/utils/generateDir')
const buildDir = __dirname+"/dist/";
const useCaseGenerator = require('./src/generators/domain/use-cases/generate_use_case')
const aggregateRootGenerator = require('./src/generators/domain/aggregate/aggregate_generator');
const controllerGenerator = require('./src/generators/controller/controller_generator');

async function Bootstrap(){
    generateDir(buildDir);
    const domainName = await askDomainName();
    const domainDir = buildDir+domainName.toLowerCase()+"/";
    generateDir(domainDir)
    // BUILD STEPS

    // 1. GENERATE ENTITY
    entityGenerator.init(domainDir,domainName);

    // GENERATE REPOSITORY
    repositoryGenerator.init(domainDir,domainName);
    
    // GENERATE USE-CASES
    useCaseGenerator.init(domainDir,domainName);
    
    // UPDATE AGGRGATE-ROOT
    aggregateRootGenerator.init(buildDir,domainName);

    // CREATE CONTROLLERS
    controllerGenerator.init(buildDir,domainName);
}

Bootstrap();