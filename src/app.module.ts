import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
// This is the decorator ↓
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule
  ],
})
export class AppModule {}


// AppModule has been annotated with the module decorator
// If it's not annotated with the module decorator for nest.js is not a module.

// A decorator is a function that add some metadata to the current class or function that is kind of decorating.
// So just add more property to that class.


//  this file is as important as app.jsx in react
// https://www.youtube.com/watch?v=GHTA143_b-s