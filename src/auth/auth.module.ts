import { Module } from "@nestjs/common";
// import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule} from '@nestjs/jwt'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";

@Module({
    //imports:[PrismaModule], 
    // ↑ it's not necessary to import a module like this every time we want to create an import.
    // We can create a global module.
    imports:[JwtModule.register({})],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy]
})
// controllers: its responsible for handling requests.
// service/provider: its responsible for handling the business logic.
export class AuthModule {}
