import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController, UploadController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { product, productSchema } from "../Schema/product.schema";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { Images, ImagesSchema } from "../Schema/image.schema";


@Module({
  controllers: [ProductController, UploadController],
  providers: [ProductService],
  imports: [
    MongooseModule.forFeature([{ name: product.name, schema: productSchema }]),
    MongooseModule.forFeature([{ name: Images.name, schema: ImagesSchema }]),
    CloudinaryModule
  ]
})
export class ProductModule {
}
