import { ArrayMaxSize, ArrayMinSize, IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator";
// import { Type } from 'class-transformer';

export class MailRecipientDto {
  @IsNotEmpty()
  @IsEmail()
  email_address!: string;
}

export class SendMailDto {
  @IsNotEmpty()
  @MinLength(3)
  subject!: string;

  @IsNotEmpty()
  @MinLength(20)
  content!: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  // @Type(() => MailRecipientDto)
  recipients!: MailRecipientDto[];
}

export class SendVerificationMailDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @MinLength(3)
  subject!: string;

  @IsNotEmpty()
  @MinLength(20)
  content!: string;

  @IsNotEmpty()
  url!: string

  @IsNotEmpty()
  @IsEmail()
  recipient!: string;
}

export class SendProcurementMailDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @MinLength(3)
  subject!: string;

  @IsNotEmpty()
  @MinLength(20)
  content!: string;

  @IsNotEmpty()
  url!: string

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  // @Type(() => MailRecipientDto)
  recipients!: MailRecipientDto[];
}

export class SendDefaultMailDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @MinLength(3)
  subject!: string;

  @IsNotEmpty()
  @MinLength(20)
  content!: string;

  @IsNotEmpty()
  url!: string

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  // @Type(() => MailRecipientDto)
  recipients!: MailRecipientDto[];

  @IsNotEmpty()
  @IsString()
  tag!: string
}
