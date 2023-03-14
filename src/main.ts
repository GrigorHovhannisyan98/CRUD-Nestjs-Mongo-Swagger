import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async  function start(){

  const PORT=process.env.PORT || 3000
  const app=await  NestFactory.create(AppModule)
  const config = new DocumentBuilder()
      .setTitle('app')
      .addServer('http://localhost:3000')
      .setDescription('CRUD API')
      .setVersion('1.0')
      .addTag('api')
      
  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT)
}
start()