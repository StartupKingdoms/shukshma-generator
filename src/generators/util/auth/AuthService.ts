import { injectable } from "inversify";
import { AuthService } from "shukshma";
import { interfaces} from "inversify-express-utils";
import { CustomPrincipal } from "./CustomPrincipal";
import { Caching } from "../caching/Caching";
import { TokenValidator } from "./TokenValidator";


@injectable()
export class AuthServiceImpl implements AuthService{

    async getUser(token: any): Promise<interfaces.Principal> {
       try {
            // GETTING USER VERIFYING IF TOKEN EXISTS IN REDIS
            const cache = new Caching();
            const retreivedToken  =  await cache.get(token) ;
            if (retreivedToken != {}) {
                // GETTING THE TOKEN AND SECURING TOKEN USING JWT VALIDATOR
                const tokenValidator = new TokenValidator();
                const userData =<object> tokenValidator.validateToken(retreivedToken);
                const principal = new CustomPrincipal(userData);
                return principal ;
        } else {
            // throw InvalidUserException("token does not exists")
        }
       } catch (error) {
            // MANAGE ERROR HERE LATER
            console.log("error ",error);
       }
    }    
    
    
  
    
}