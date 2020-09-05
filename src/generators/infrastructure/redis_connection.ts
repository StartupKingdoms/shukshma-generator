import { RedisConnection } from "shukshma";
import {get} from 'config';
export class RedisStorageConnection {
    constructor() {
        new RedisConnection(get("redis_env")["connection"]);
    }
    
}