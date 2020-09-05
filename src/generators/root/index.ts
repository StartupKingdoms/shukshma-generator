import "reflect-metadata";
import * as compress from 'compression';
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import {get} from "config";
import * as express from 'express';
import * as swagger from "swagger-express-ts";
import * as fileUpload from 'express-fileupload';
import {  InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import * as cors from 'cors';

import { IocContainer } from 'shukshma';
import { MongoDBConnection } from './src/infrastructure/mongo_connection';

import './src/util/binding/default.bindings';
import './src/util/binding/ioc.bindings';
// import './src/lib/binding/ioc_default.bindings';
import { WinstonLogger } from "shukshma";
import { AuthProvider } from 'shukshma';
import { RabbitConnection } from "shukshma";
import { RedisStorageConnection } from './src/infrastructure/redis_connection';
import { ExceptionManager } from 'shukshma';
//setup logger 
const logger = (new WinstonLogger()).getLogInstance();

// set up RabbitMQ conncetion
// new RabbitConnection();

// set up data base connection
new MongoDBConnection();

// setting up the redis connection
new RedisStorageConnection();

// set up container
let container = IocContainer.get_ioc_container();


// create server
// let server = new InversifyExpressServer(container ,null, { rootPath: "/api/v1" },null,AuthProvider);
let server = new InversifyExpressServer(container ,null, { rootPath: "/api/v1" },null);
server.setConfig((app) => {
    app.use(cors());
  app.use( '/api-docs/swagger' , express.static( 'swagger' ) );
  app.use( '/api-docs/swagger/assets' , express.static( 'node_modules/swagger-ui-dist' ) );
  app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(compress());
    app.use(fileUpload());
  app.use( swagger.express(
    {
        definition : {
            info : {
                title : "ORGANIZATION API" ,
                version : "1.0"
            },
            basePath:"/api/v1",
            externalDocs:{
                url:"http://localhost:3000/api-docs/swagger.json",
                description:"Organization apis and models"
            }
        }
    }
) );
});


import "./src/application/controller/index";

server.setErrorConfig((app) => {
  app.use(async (error, req, res, next) => {
      const errorResponse = new ExceptionManager(error,res);
      const generatedReponse = await errorResponse.process();
      return generatedReponse.sendResponse();
  });
});

// const routeInfo = getRouteInfo(container);
// console.log(routeInfo);

let app = server.build();
app.listen(get("server")["port"],err=>{
    if (err) {
        console.log("error starting the server ",err.message);
        return ;
    }
    console.log("app listening on port ",get("server")["port"])
});

export default app;