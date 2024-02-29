import { IsNotEmpty, IsString } from "class-validator";

export class User {
    id!: number;
    token?: string;
  }

export class UserSkillResource {
  name!: string;
}