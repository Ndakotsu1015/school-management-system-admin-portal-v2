// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { S3 } from 'aws-sdk';
// import { v4 as uuid } from 'uuid';
// import { PrismaService } from '../../prisma/prisma.service';

// @Injectable()
// export class AwsFileService {
//   private readonly s3bucketName: string;
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly prisma: PrismaService,
//   ) {
//     this.s3bucketName = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
//   }

//   async uploadMediaFile(dataBuffer: Buffer, filename: string) {
//     const s3 = new S3();
//     const uploadResult = await s3
//       .upload({
//         ACL: 'public-read',
//         Bucket: this.s3bucketName,
//         Body: dataBuffer,
//         Key: `${uuid()}-${filename}`,
//       })
//       .promise();

//     // const mediaFile = await this.prisma.mediaFile.create({
//     //     data: {
//     //         key: uploadResult.Key,
//     //         url: uploadResult.Location,
//     //     }
//     // });

//     // return mediaFile;
//   }
// }
