import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class UserMetaData {
  @IsNotEmpty()
  fullname: string

  @IsNotEmpty()
  nip: number

  @IsNotEmpty()
  unit: string

  @IsOptional()
  username?: string
}

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  user_metadata: UserMetaData
}
