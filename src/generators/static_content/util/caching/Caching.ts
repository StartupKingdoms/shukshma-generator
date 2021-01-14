import { ICaching } from "shukshma";
import { RedisConnection } from "shukshma";
import {promisify} from 'util';

export class Caching  implements ICaching{
    
    private getAsync ;
    // private setAsync ;
    constructor() {
        this.getAsync = promisify(RedisConnection.cacheStore.get).bind(RedisConnection.cacheStore);
        // this.setAsync = promisify(RedisConnection.cacheStore.set).bind(RedisConnection.cacheStore);
    }


    async set(key: string, value: Object) {
       const serializedValue = this.serialze(value);
       const result = await RedisConnection.cacheStore.set(key,serializedValue);
       return result ;
    }
    async get(key: any): Promise<any> {
        let receivedData = await this.getAsync(key);
        return this.deserialize(receivedData) || {} ;
    }
    
    deserialize(data: string) {
        return JSON.parse(data);
    }
    
    serialze(data: Object) {
       return JSON.stringify(data);
    }

}