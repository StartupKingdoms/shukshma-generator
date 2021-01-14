#!/usr/bin/env node

const entityGenerator = require('./src/generators/domain/entity/entity_element.console.builder');
const repositoryGenerator = require('./src/generators/domain/repository/repo_generator');
const askDomainInfo = require('./src/utils/askDomain');
const generateDir = require('./src/utils/generateDir');
let projectWorkingDir = process.cwd()
const useCaseGenerator = require('./src/generators/domain/use-cases/generate_use_case');
const aggregateRootGenerator = require('./src/generators/domain/aggregate/aggregate_generator');
const controllerGenerator = require('./src/generators/controller/controller_generator');
const copyFolderRecussively = require('./src/utils/copyFolderRecursive');
const copyFolderContentRecussively = require('./src/utils/copyFolderContentRecussively');
const project = require('./src/utils/project');
const branding = require('./src/utils/showBranding');

async function Bootstrap() {

    let buildDir = projectWorkingDir + "/src/";
    let baseDir = projectWorkingDir + "/";

    branding.showBranding();
    
    // CLEAR THE CONSOLE AND SHOW BRANDING
    if(!project.checkIfNewProject(projectWorkingDir)){
    let domainName = await askDomainInfo.askDomainName();
    buildDir = projectWorkingDir+"/"+domainName+"/src/";
    baseDir = projectWorkingDir+"/"+domainName+"/";
    }

    // GET THE SUBDOMAIN
    const className = await askDomainInfo.askSubDomainName();
    


    const domainDir = buildDir + "domain/" + className.toLowerCase() + "/";
    const aggrRootDir = buildDir + "domain/";

    generateDir(buildDir);
    generateDir(domainDir);
    // BUILD STEPS



    // CHECK IF ROOT FILES EXIST AND COPY THE STATIC FILES
    copyFolderContentRecussively(__dirname + "/src/generators/static_content/root", baseDir);
    copyFolderRecussively(__dirname + "/src/generators/static_content/config", baseDir);
    copyFolderRecussively(__dirname + "/src/generators/static_content/util", buildDir);
    copyFolderRecussively(__dirname + "/src/generators/static_content/infrastructure", buildDir);

    // INSTALL PACKAGES
    await project.initializeGit(baseDir);
    await project.installPackages(baseDir, "npm");

    // 1. GENERATE ENTITY
    entityGenerator.init(domainDir, className);

    // GENERATE REPOSITORY
    repositoryGenerator.init(domainDir, className);

    // GENERATE USE-CASES
    useCaseGenerator.init(domainDir, className);

    // UPDATE AGGRGATE-ROOT
    aggregateRootGenerator.init(aggrRootDir, className);
    // aggregateRootGenerator.init(buildDir,className);

    // CREATE CONTROLLERS
    controllerGenerator.init(buildDir + "application/", className);
}

Bootstrap();