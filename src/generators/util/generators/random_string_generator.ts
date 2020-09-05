import * as cryptoString  from "crypto-random-string";

export class RandomStringGenerator {
    constructor() {
        
    }

    static generate():string{
        return String(cryptoString({length:6})).toUpperCase();
    }
}