import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./product/product.module";
import { ConfigModule } from "@nestjs/config";


@Module({
  exports: [],

  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ProductModule


  ]


})
export class AppModule {
}