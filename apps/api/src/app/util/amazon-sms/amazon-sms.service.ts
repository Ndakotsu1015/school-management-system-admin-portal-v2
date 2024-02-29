// import { Injectable } from "@nestjs/common";
// import { SMS, SNS } from "aws-sdk";
// import { AbstractSMSProvider } from "../sms/sms.interface";

// @Injectable()
// export class AwsSmsService implements AbstractSMSProvider {
//   async sendSMS(phone: string, text: string): Promise<void> {
//     const sns = new SNS({
//       region: 'eu-west-2'
//     });
//     const result = await sns.publish({
//       Message: text,
//       PhoneNumber: phone,
//     }).promise();
//     console.log("Amazon SMS Sent!");
//     console.log(result);
//     // throw new Error("Method not implemented.");
//   }
// }
