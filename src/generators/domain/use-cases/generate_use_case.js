const checkIfFileExists = require('../../../utils/checkIfFileExists');
const writeClassToFile = require('../../../utils/writeClassToFile');
const createUseCase = require('./create');
const createUseCaseTest = require('./create_test_generator');
const updateUseCase = require('./update');
const updateUseCaseTest = require('./update_test_generator');
const removeUseCase = require('./remove');
const removeUseCaseTest = require('./remove_test_generator');
const getAllUseCase = require('./getAll');
const getByIdUseCase = require('./getById');
const getByIdUseCaseTest = require('./getById_test_generator');

const TYPES ={
    CREATE:'CREATE',
    UPDATE:'UPDATE',
    REMOVE:'REMOVE',
    GETALL:'GETALL',
    GETBYID:'GETBYID'
}

module.exports.init = function init(dirName,domainName) {
    dirName = dirName + "use-cases/";


    // GENERATE CREATE USECASE
    generateUseCase(dirName,domainName,TYPES.CREATE,createUseCase);
    generateUseCaseTest(dirName,domainName,TYPES.CREATE,createUseCaseTest);

    // GENERATE UPDATE USECASE
    generateUseCase(dirName,domainName,TYPES.UPDATE,updateUseCase);
    generateUseCaseTest(dirName,domainName,TYPES.UPDATE,updateUseCaseTest);
    
    // GENERATE REMOVE USECASE
    generateUseCase(dirName,domainName,TYPES.REMOVE,removeUseCase);
    generateUseCaseTest(dirName,domainName,TYPES.REMOVE,removeUseCaseTest);
    
    // GENERATE GETALL USECASE
    // generateUseCase(dirName,domainName,TYPES.GETALL,getAllUseCase);

    // GENERATE GETBYID USECASE
    generateUseCase(dirName,domainName,TYPES.GETBYID,getByIdUseCase);
    generateUseCaseTest(dirName,domainName,TYPES.GETBYID,getByIdUseCaseTest);
    
}


function generateUseCase(dirName,domainName,type,callback) {
    let useCaseFileName ;
    switch (type) {
        case TYPES.CREATE:
            useCaseFileName = "create" + domainName +".ts"
            break;
        case TYPES.UPDATE:
            useCaseFileName = "update" + domainName +".ts"
            break;
        case TYPES.REMOVE:
            useCaseFileName = "remove" + domainName +".ts"
            break;
        case TYPES.GETALL:
            useCaseFileName = "getAll" + domainName +".ts"
            break; 
        case TYPES.GETBYID:
            useCaseFileName = "getById" + domainName +".ts"
            break;          
        default:
            break;
    }
    if (!useCaseFileName) return ;

    // GENERATE USE CASE
    const isUseCaseFilePresent = checkIfFileExists(dirName,useCaseFileName);
    if(!isUseCaseFilePresent){
        writeClassToFile(callback(domainName),dirName,useCaseFileName)
    }

}


function generateUseCaseTest(dirName,domainName,type,callback) {
    let useCaseTestFileName;
    switch (type) {
        case TYPES.CREATE:
            useCaseTestFileName = "create" + domainName +".spec.ts"
            break;
        case TYPES.UPDATE:
            useCaseTestFileName = "update" + domainName +".spec.ts"
            break;
        case TYPES.REMOVE:
            useCaseTestFileName = "remove" + domainName +".spec.ts"
            break;
        case TYPES.GETALL:
            useCaseTestFileName = "getAll" + domainName +".spec.ts"
            break; 
        case TYPES.GETBYID:
            useCaseTestFileName = "getById" + domainName +".spec.ts"
            break;          
        default:
            break;
    }
    if (!useCaseTestFileName) return ;

    //GENERATE USE CASE TEST FILE
    const isUseCaseTestFilePresent = checkIfFileExists(dirName,useCaseTestFileName);
    if(!isUseCaseTestFilePresent){
        writeClassToFile(callback(domainName),dirName,useCaseTestFileName)
    }
}


