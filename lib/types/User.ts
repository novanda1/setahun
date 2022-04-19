import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
export class UserMetaData {
  @MinLength(6)
  @MaxLength(20)
  fullname: string;

  @MinLength(6)
  @MaxLength(20)
  nip: number;

  @MinLength(6)
  @MaxLength(20)
  unit: string;
}

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: "password too weak" }
  )
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches("password")
  passwordConfirm: string;

  @IsNotEmpty()
  user_metadata: UserMetaData;
}

export class UpdateUserDTO {
  @IsOptional()
  fullname: string;

  @IsOptional()
  @IsInt()
  nip: number;

  @IsOptional()
  unit: string;
}
