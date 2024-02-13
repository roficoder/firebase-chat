import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as global from 'aws-sdk/global';
import { environment } from 'src/environments/environment';

@Injectable()
export class UploadService {
  constructor() { }

  // async uploadFile(file: any) {
  //   try {
  //     const contentType = file.type;
  //     const bucket = new S3(environment.awsStorageBucket);
  //     const params = {
  //       Bucket: environment.awsStorageBucket.bucketName,
  //       Key: Date.now() + "-" + file.name,
  //       Body: file,
  //       ACL: 'public-read',
  //       ContentType: contentType,
  //     };
  //     let data = await bucket.upload(params).promise();
  //     return data;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // async uploadBlob(blob: any) {
  //   try {
  //     const contentType = "video/webm";
  //     const bucket = new S3(environment.awsStorageBucket);
  //     const params = {
  //       Bucket: environment.awsStorageBucket.bucketName,
  //       Key: `${Date.now().toString()}-video.webm`,
  //       Body: blob,
  //       ACL: 'public-read',
  //       ContentType: contentType,
  //     };
  //     let data = await bucket.upload(params).promise();
  //     return data;
  //   } catch (error) {
  //     return null;
  //   }
  // }

}
