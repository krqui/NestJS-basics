import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
// ↑ by adding global decorator, ↓ this prisoner service will be available to all the modules in our app.
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
