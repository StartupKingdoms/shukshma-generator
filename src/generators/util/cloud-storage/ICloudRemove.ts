
export interface S3Params {
    Key: string, // File name you want to save as in S3
    Bucket: string,
};


export interface ICloudRemove{
    remove(s3_params: S3Params);
   
}

export interface ICloudRemoveMultiple{
    removeMultiple();
}