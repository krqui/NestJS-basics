import { Controller,Get, Patch, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
@UseGuards(JwtGuard)
@Controller('users')
// this mean that this controller name will be users
export class UserController {
    // abrimos Postman, ruta http://localhost:3333/users/me
    // en Headers en key colocamos Authorization y le damos de valor Bearer efekejgadng...
    // donde ejfekfje es el token generado al crear un usuario en la ruta Post.
    // Recordar que dicho token se resetea cada 10 minutos.
    constructor(private userService: UserService){}
    @Get('me')
    getMe(@GetUser() user:User){
        return user;
    }
        /*@GetUser() user:User,
        @GetUser('email') email:string)
        {
            console.log({email});
            return user;
        }*/
    @Patch()
    editUser(
        @GetUser('id') userId:number,
        @Body() dto:EditUserDto,
    ){
        return this.userService.editUser(userId,dto);
    }
}
