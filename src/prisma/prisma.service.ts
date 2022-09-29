import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
@Injectable()
// PrismaClient is a class that allows to connect basically to the database.
// It has connect, disconnect, and execute SQL and everything.
// So I want to instanciate it with its configuration, so I need to constructor and I needed to call super.
export class PrismaService extends PrismaClient{
    constructor(config:ConfigService){
        super({
            datasources:{
                db:{
                    url:config.get('DATABASE_URL'),
                },
            }
        });
        //console.log(config.get('DATABASE_URL'));
    }
    cleanDb(){
        // 'this' is actually Prisma, so this is the PrismaClient
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany()
        ]);
    }
}

