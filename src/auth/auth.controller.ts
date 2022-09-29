import { Controller, Post, Body, Req, HttpStatus, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){
       //this.authService.test();
    }

    

    // Post decorator that comes with NessJS common.
    @Post('signup')// en Postman veras un status 201 created.
    signup(@Body() dto:AuthDto) {
        //return {msg: 'Hello'};
        /*console.log({dto});*/
        return this.authService.signup(dto);
    }
    // if we want to log the body:
    /*@Post('signup2')
    signup2(@Req() req:Request) {
        console.log(req.body);
        return this.authService.signup();
    }*/
    // ↑ Psdt: When working with NES GS, you should never really use the request object (@Req() req:Request) of the underlying libray.
    // Because if you want to switch no another framework in the future no podras reutilizar el codido y se perdera esa flexibilidad propia de NestJS. 

    // An example of "pipes": ↓
    /*@Post('signup')
    signup3(
        @Body('email') email:string,
        @Body('password',ParseIntPipe) password:string,)
        {console.log({
            email,
            typeOfEmail:typeof email,
            password,
            typeOfPassword:typeof password
        });
        return this.authService.signup();
    }*/


    @HttpCode(HttpStatus.OK) // ← with this, se creara con un status 200.
    @Post('signin')
    signin(@Body() dto:AuthDto) {
        return this.authService.signin(dto);
    }// NestJS will automatically convert the data type based on the return.
    // So, you don't need to worry about sending the right data type.
}
// ↑↑↑↑↑↑↑↑ it's the same as:
/*export class AuthController2{
    authService:AuthService;
    constructor(authService:AuthService){
        this.authService= authService;
    }
}*/