import { MongoConnection } from "shukshma";
import {get} from 'config';
export class MongoDBConnection {
     db:MongoConnection ;
    constructor() {
        this.db = new MongoConnection(get("database")["mongo"]["host"],
                            get("database")["mongo"]["options"]);
    }


    closeConnection(){
        this.db.closeConnection();
    }
    
}