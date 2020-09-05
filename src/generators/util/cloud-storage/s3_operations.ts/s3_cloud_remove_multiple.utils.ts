import * as AWS from 'aws-sdk';
import {get} from 'config';
import { ICloudRemoveMultiple } from "../ICloudRemove";
import { DeleteObjectsRequest, ObjectIdentifier } from 'aws-sdk/clients/s3';


interface S3RemoveMultipleParams extends DeleteObjectsRequest {
    Delete: {
        Objects:ObjectIdentifier[]
    }; 
    Bucket: string;
};

export class S3CloudRemoveMultiple implements ICloudRemoveMultiple {

    s3_params: S3RemoveMultipleParams;

    constructor(s3_params: S3RemoveMultipleParams) {
        this.s3_params = s3_params;
        this.s3_params.Bucket = get('aws-s3')["bucket_name"];
    }


    async removeMultiple() {
        AWS.config.update({
            accessKeyId: get('aws-s3')["access_key"],
            secretAccessKey: get('aws-s3')["secret_key"],
            region: get('aws-s3')["region"],
        })

        const s3 = new AWS.S3();
        return new Promise((resolve, reject) => {
            s3.deleteObjects(this.s3_params, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        })

    }
}