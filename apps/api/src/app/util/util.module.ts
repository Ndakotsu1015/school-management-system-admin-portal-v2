import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
// import { AwsFileService } from "./aws-file/aws-file.service";
import { BcryptService } from "./bcrypt/bcrypt.service";
import { OtpGeneratorService } from "./otp-generator/otp-generator.service";
import { ImageUtilService } from "./image/util.imageurl.service";
import { UidService } from "./uid/uid.service";

const providers = [
  BcryptService,
  OtpGeneratorService,
  // AwsFileService,
  ImageUtilService,
  UidService,
];

@Global()
@Module({
  imports: [HttpModule],
  providers: [...providers],
  exports: [...providers],
})
export class UtilModule { }
