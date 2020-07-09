const checkIfFileExists = require('../../utils/checkIfFileExists');
const writeClassToFile = require('../../utils/writeClassToFile');
const createUseCase = require('./create');
const updateUseCase = require('./update');
const removeUseCase = require('./remove');
const getAllUseCase = require('./getAll');
const getByIdUseCase = require('./getById');

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

    // GENERATE UPDATE USECASE
    generateUseCase(dirName,domainName,TYPES.UPDATE,updateUseCase);
    
    // GENERATE REMOVE USECASE
    generateUseCase(dirName,domainName,TYPES.REMOVE,removeUseCase);
    
    // GENERATE GETALL USECASE
    generateUseCase(dirName,domainName,TYPES.GETALL,getAllUseCase);

    // GENERATE GETBYID USECASE
    generateUseCase(dirName,domainName,TYPES.GETBYID,getByIdUseCase);
    
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
    const isFilePresent = checkIfFileExists(dirName,useCaseFileName);
    if(!isFilePresent){
        writeClassToFile(callback(domainName),dirName,useCaseFileName)
    }
}
