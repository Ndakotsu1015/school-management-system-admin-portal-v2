import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
export class AuthLoginRequestDto {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}

export interface AuthLoginResponseDto {
  access_token: string;
  must_change_password: boolean;
  user: AuthLoggedInUserDto;
}

export interface AuthLoggedInUserDto {
  id?: number;
  uid: string;
  staff_code: string;
  full_name: string;
  mda?: {
    id: number;
    name: string;
  };
  permissions: string[];
}

// User Roles

export class CreateMdaUserSecurityGroupDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;
}

export class UpdateMdaUserSecurityGroupDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;
}

export class SetPermissionsOnMdaUserSecurityGroupDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  permission_uids!: string[];
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  uid?: string
}

export class UpdateMdaUserActivationStatusDto {
  @IsNotEmpty()
  @IsString()
  user_uid!: string

  @IsBoolean()
  @IsNotEmpty()
  is_active!: boolean
}

export class AssignMdaUserToUserOrganisationUnitDto {
  @IsNotEmpty()
  organisation_unit_uid!: string;

  @IsNotEmpty()
  user_uid!: string;
}

export class RemoveMdaUserFromUserOrganisationUnitDto {
  @IsNotEmpty()
  organisation_unit_uid!: string;

  @IsNotEmpty()
  user_uid!: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsBoolean()
  must_change_password!: false;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  email!: string;
}

export class UpdateProfileDto {
  @IsEmail()
  address?: string;

  @IsString()
  phone?: string

  @IsString()
  site?: string

  @IsString()
  gender?: string

  @IsString()
  birthday?: string;

  // @IsArray()
  // @ArrayMaxSize(10)
  // skills?: MdaUserSkillDto[]
}
