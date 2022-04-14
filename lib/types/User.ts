import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator'
export class UserMetaData {
  @IsNotEmpty()
  fullname: string

  @IsNotEmpty()
  nip: number

  @IsNotEmpty()
  unit: string
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


export class UpdateUserDTO {
  @IsOptional()
  fullname: string

  @IsOptional()
  @IsInt()
  nip: number

  @IsOptional()
  unit: string
}