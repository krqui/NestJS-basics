import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    // 'jwt2' o como se te antoje llamarlo.
    // por default es 'jwt'
    'jwt'
) {
    constructor(config:ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration:false, oculto porque is set by default.
            secretOrKey:config.get('JWT_SECRET'),
        });
    }

    async validate(payload:{
        sub:number;
        email:string;
    }){
        const user=
        await this.prisma.user.findUnique({
            where:{
                id:payload.sub,
            }
        });
        /*console.log({payload});*/
        delete user.hash;
        return user;
    // lo de este payload se manda a user.controller.ts y se puede chequear en el console.log comentado.
    }
}