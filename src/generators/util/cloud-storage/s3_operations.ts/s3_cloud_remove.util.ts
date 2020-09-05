import * as AWS from 'aws-sdk';
import {get} from 'config';
import { ICloudRemove, S3Params } from "../ICloudRemove";



export class S3CloudRemove implements ICloudRemove {

    s3_params: S3Params
    constructor() {
     
    }


    async remove(s3_params: S3Params) {
        this.s3_params = s3_params;
        this.s3_params.Bucket = get('aws-s3')["bucket_name"];

        AWS.config.update({
            accessKeyId: get('aws-s3')["access_key"],
            secretAccessKey: get('aws-s3')["secret_key"],
            region: get('aws-s3')["region"],
        })

        const s3 = new AWS.S3();

        return new Promise((resolve, reject) => {
            s3.deleteObject(this.s3_params, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        })

    }
}