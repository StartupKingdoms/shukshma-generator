const checkIfFileExists = require('../../utils/checkIfFileExists');
const writeClassToFile = require('../../utils/writeClassToFile');
const mongoRepoImplGenerator = require('../repository/mongo_repo_impl_generator');
const mongoRepoTestCaseGenerator = require('./mongo_repo_testcase_generator');
let dirName;
let classfileName;


function createRepository(domainName) {
    repoClassName = domainName + "Repository";
    isFilePresent = checkIfFileExists(dirName, domainName);
    const domainEntityName = domainName+"Entity";
    if (!isFilePresent) {
        const repoText = `
import { ${domainEntityName}} from "../entity/${domainName}.entity";

export interface ${repoClassName}{

    getById(id:string):Promise<${domainEntityName}>;
    save(instance:${domainEntityName}):Promise<${domainEntityName}>;
    update(instance:${domainEntityName}):Promise<${domainEntityName}>;
    delete(id:string):Promise<${domainEntityName}>;
}
        `
        return repoText
    }
}

module.exports.init = function init(dir_name, domainName) {
    dirName = dir_name + "repository/";
    classfileName = domainName + ".repo.ts";
    
    const isRepoPresent = checkIfFileExists(dirName,classfileName);
    if (!isRepoPresent) {
        const repoText = createRepository(domainName);
        writeClassToFile(repoText, dirName, classfileName);
    }


    const mongoImplClassFileName = "mongo" + domainName + ".repo.ts";
    const isImplPresent = checkIfFileExists(dirName,mongoImplClassFileName);
    if (!isImplPresent) {
        const repoImplText = mongoRepoImplGenerator(domainName);
        writeClassToFile(repoImplText,dirName,mongoImplClassFileName);
    }

    const mongoImplTestClassFileName = "mongo" + domainName + ".repo.spec.ts";
    const isTestCasePresent = checkIfFileExists(dirName,mongoImplTestClassFileName);
    if (!isTestCasePresent) {
        const repoImplTestText = mongoRepoTestCaseGenerator(domainName);
        writeClassToFile(repoImplTestText,dirName,mongoImplTestClassFileName);
    }
    // done
}