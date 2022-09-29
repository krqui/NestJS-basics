import { IsEmail, IsNotEmpty, IsString} from "class-validator"

// After install class validator class transformer, we must change interface to class.
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password:string;
}
/*export interface AuthDto {
    email: string,
    password: string;
}*/