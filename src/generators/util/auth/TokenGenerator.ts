import { ITokenGenerator } from "shukshma";
import {sign,Secret,SignOptions} from 'jsonwebtoken'
import { get } from "config";

export class TokenGenerator implements ITokenGenerator {

    private jwtSecret:Secret ;
    private options:SignOptions;
    constructor() {
        this.jwtSecret = get("jwt")["secret"];
        this.options = get("jwt")["options"];
    }

    signToken(data: object):string {
            const token = sign(data,this.jwtSecret,this.options);
            return token ;
    }
}