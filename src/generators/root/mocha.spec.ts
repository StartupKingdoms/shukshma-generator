import "reflect-metadata";
import './src/util/binding/default.bindings';
import './src/util/binding/ioc.bindings';
// import {} from  'shukshma';'./src/lib/binding/ioc_default.bindings';

import { MongoDBConnection } from "./src/infrastructure/mongo_connection";

before('Initialize DB and ioc_bindings',async ()=>{
    // Initialize mongodb Connection
    await new MongoDBConnection();
})