import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
    // ↑ if set True, el validador quitará al objeto validado las propiedades que no tengan decorators.
    // o sea si por Postman, ademas mandase un id, este no se imprimiria.
    // So now we can be sure that 'dto' has en email and a password, and know all the fields that we have defined.
  }));
  await app.listen(3333)// porque usualmente usamos el 3000 para React.;
}
bootstrap();