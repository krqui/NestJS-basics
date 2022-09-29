import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";
// decorator injectable. Its going to be able to use the dependency injection that NestJS uses under the hood.
@Injectable()
export class AuthService {
    //test(){}
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        ) {}
    async signup(dto: AuthDto){
        // generate the password hash
        const hash= await argon.hash(dto.password);
        try {
            // save the new user in the db
            const user= await this.prisma.user.create({
                data:{
                    email: dto.email,
                    hash,
                },
            // si solo quiero mandar algunas propiedades en json:
                /*select: {
                    id:true,
                    email:true,
                    createdAt:true,
                }*/
                // ↑ but there's another way: use transformers.
        });
        /*delete user.hash; // .hash no te saldra en json en Postman.
        return user;*/
        return this.signToken(user.id, user.email);
        } catch (error){ // check documentation.
            // if error is a Prisma Error ...
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002') {
                    // ForbiddenException comes from nestJs
                    throw new ForbiddenException('Credentials taken.')
                }
            }
            throw error;
        }// si no usaramos nada del catch, entonces podriamos recibir un error 500.
        
    }

    async signin(dto: AuthDto){
        // find the user by email.
        const user= await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException('Credentials incorrect');
        // compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        );
        // if password incorrect throw exception
        if (!pwMatches)
            throw new ForbiddenException('Credentials incorrect');
        /*// send back the user
        delete user.hash;*/
        //return user;
        //return {msg: 'I have signed in.'}
        return this.signToken(user.id, user.email);
        // ↑ te devuelve el token. Puedes copiarlo, pegarlo y descifrarlo en https://jwt.io/
    }
    async signToken(userId:number, email:string):Promise<{access_token:string}>{
        const payload={
            sub:userId,
            email
        };
        const secret= this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret
            }
        );

        return {
            access_token:token,
        }
    }
}