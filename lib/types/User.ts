import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserMetaData {
  @IsNotEmpty({ message: "Wajib Diisi" })
  fullname: string;

  @IsNotEmpty({ message: "Wajib Diisi" })
  nip: number;

  @IsNotEmpty({ message: "Wajib Diisi" })
  unit: string;
}

export class CreateUserDTO {
  @IsEmail({}, { message: "Email tidak valid" })
  @IsNotEmpty({ message: "Wajib Diisi" })
  email: string;

  @IsString()
  @MaxLength(20, { message: "Maksimal 20 huruf" })
  @MinLength(6, { message: "Minimal 6 huruf" })
  password: string;

  @IsString()
  @MaxLength(20, { message: "Maksimal 20 huruf" })
  @MinLength(6, { message: "Minimal 6 huruf" })
  passwordConfirm: string;

  @IsNotEmpty({ message: "Wajib Diisi" })
  user_metadata: UserMetaData;
}

export class UpdateUserDTO extends UserMetaData {
  id?: string;
  role?: "read-only" | "moderator";
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: "Minimal 6 huruf" })
  @MaxLength(20, { message: "Maksimal 20 huruf" })
  password: string;
}
