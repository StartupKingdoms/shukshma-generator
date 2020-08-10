const convertToCamelCase = require('../../utils/toCamelCase');

module.exports = function(domainName){
    return {
    domainEntityName : domainName+"Entity",
    domainRepositoryName : domainName+"Repository",
    domainNameModel : domainName + "Model",
    domainNameCamelCase : convertToCamelCase(domainName),
    databaseType : "Mongo"
}
}