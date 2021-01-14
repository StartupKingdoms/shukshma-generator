import { ITokenValidator } from "shukshma";
import { verify, Secret} from 'jsonwebtoken';
import { get } from "config";
export class TokenValidator implements ITokenValidator{

    private jwtSecret:Secret ;
    
    constructor(){
        this.jwtSecret = get("jwt")["secret"];
    }
    
    validateToken(token: string) {
            const result =  verify(token,this.jwtSecret);
            console.log("token details ",result);
            return result;
    }    

}