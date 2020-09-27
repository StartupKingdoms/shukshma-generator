const entityGenerator = require('./src/generators/domain/entity/entity_element.console.builder');
const repositoryGenerator = require('./src/generators/domain/repository/repo_generator');
const askDomainName = require('./src/utils/askDomain');
const generateDir = require('./src/utils/generateDir');
const buildDir = __dirname+"/dist/src/";
const baseDir = __dirname+"/dist/";
const useCaseGenerator = require('./src/generators/domain/use-cases/generate_use_case');
const aggregateRootGenerator = require('./src/generators/domain/aggregate/aggregate_generator');
const controllerGenerator = require('./src/generators/controller/controller_generator');
const copyFolderRecussively = require('./src/utils/copyFolderRecursive');
const copyFolderContentRecussively = require('./src/utils/copyFolderContentRecussively');

async function Bootstrap(){
    generateDir(buildDir);
    const domainName = await askDomainName();
    const domainDir = buildDir+"domain/"+domainName.toLowerCase()+"/";
    const aggrRootDir = buildDir+"domain/";

    generateDir(domainDir)
    // BUILD STEPS

    // CHECK IF ROOT FILES EXIST AND COPY THE STATIC FILES
    copyFolderContentRecussively(__dirname+"/src/generators/root",baseDir);
    copyFolderRecussively(__dirname+"/src/generators/config",baseDir);
    copyFolderRecussively(__dirname+"/src/generators/util",buildDir);
    copyFolderRecussively(__dirname+"/src/generators/infrastructure",buildDir);

    // 1. GENERATE ENTITY
    entityGenerator.init(domainDir,domainName);

    // GENERATE REPOSITORY
    repositoryGenerator.init(domainDir,domainName);
    
    // GENERATE USE-CASES
    useCaseGenerator.init(domainDir,domainName);
    
    // UPDATE AGGRGATE-ROOT
    aggregateRootGenerator.init(aggrRootDir,domainName);
    // aggregateRootGenerator.init(buildDir,domainName);

    // CREATE CONTROLLERS
    controllerGenerator.init(buildDir+"application/",domainName);
}

Bootstrap();