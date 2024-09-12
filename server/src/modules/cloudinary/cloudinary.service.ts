import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './dto/cloudinary.type';
import streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadToCloudinary(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'FupartmentStore' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  uploadFile(file: Express.Multer.File) {
    return this.uploadToCloudinary(file);
  }

  uploadFiles(files: Express.Multer.File[]) {
    const returnedFiles = files.map((item) => {
      return this.uploadToCloudinary(item);
    });
    return Promise.all(returnedFiles);
  }
}
