import { ICloudUpload } from "../ICloudStorage";
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from "aws-sdk/clients/s3";
import {get} from 'config';


interface S3Params extends PutObjectRequest {
    Key: string, // File name you want to save as in S3
    Bucket: string,
    Body
};

export class S3CloudUpload implements ICloudUpload {
    s3_params: S3Params
    constructor(s3_params: S3Params) {
        this.s3_params = s3_params;
        this.s3_params.Bucket = get('aws-s3')["bucket_name"];
    }


    async upload() {
        AWS.config.update({
            accessKeyId: get('aws-s3')["access_key"],
            secretAccessKey: get('aws-s3')["secret_key"],
            region: get('aws-s3')["region"],
        })

        
        const s3 = new AWS.S3();

        // Binary data base64
        const fileContent = Buffer.from(this.s3_params.Body, 'binary');
        this.s3_params.Body = fileContent

        return new Promise((resolve, reject) => {
            s3.upload(this.s3_params, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        })

    }



}