import * as admin from 'firebase-admin';
import {get} from 'config';
export class DeviceNotifier{

    private static instance:DeviceNotifier;
    private constructor(){
        
        var serviceAccount = require('../../../config/firebase.json');
        // admin.initializeApp(firebaseConfig);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: 'https://tagtify-eb009.firebaseio.com'
        });
    }

    public static getInstance(){
      if (!this.instance) {
        this.instance = new DeviceNotifier();
        return this.instance;
      }
      return this.instance
    }

    async sendMessage(message_data,topic,fcm_token:string){
        return new Promise((resolve,reject)=>{
            var message = {
                data:  {"message_data":message_data,command:topic},
                android: {
                  ttl: 3600 * 1000
                },
                // topic: 'SCREEN_PAIRING',
                token:fcm_token
              };

              // Send a message to the device corresponding to the provided
              // registration token.
              admin.messaging().send(message,false)
                .then((response) => {
                  // Response is a message ID string.
                  console.log('Successfully sent message:', response);
                  resolve(response);
                })
                .catch((error) => {
                  console.log('Error sending message:', error);
                  reject(error);
                });
        })
    }
}