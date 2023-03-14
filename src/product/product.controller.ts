import { ImagesResponse } from "./response/images.response";
import { ProductResponse } from "./response/product.response";

import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { product } from "../Schema/product.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadDto } from "./dto/file.upload.dto";
import { UpdateResponse } from "./response/update.response";
import { DeleteResponse } from "./response/delete.response";
import { DeleteImageResponse } from "./response/delete.images.response";

@ApiTags("Product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Post()
  @ApiResponse({ type: ProductResponse, status: 201, description: "The product has been successfully created." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiOperation({ summary: "Create  product " })
  @ApiConsumes("application/x-www-form-urlencoded")
  create(@Body() createProductDto: CreateProductDto): Promise<CreateProductDto> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiResponse({ type: ProductResponse, status: 200, description: "Get all products." })
  @ApiResponse({ status: 404, description: "Not found." })
  @ApiOperation({ summary: "Get all  products" })
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  @ApiResponse({ type: ProductResponse, status: 200, description: "Get  product." })
  @ApiResponse({ status: 404, description: "Not found." })
  @ApiOperation({ summary: "Get product by id" })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({ type: UpdateResponse, status: 201, description: "The product has been successfully updated." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiConsumes("application/x-www-form-urlencoded")
  @ApiOperation({ summary: "Updade  product by id" })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiResponse({ type: DeleteResponse, status: 200, description: "The product has been deleted" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiOperation({ summary: "Delete  product by id" })
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}

@ApiTags("Upload")
@Controller("image")
export class UploadController {
  constructor(private readonly productService: ProductService) {
  }

  @Post("Upload:id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({ summary: "Upload  product image by id" })
  @ApiBody({ type: FileUploadDto })
  @ApiResponse({ type: ImagesResponse, status: 201, description: "The images has been successfully uploaded." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  uploadProductImage(@Param("id") id: string, @UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadImage(file, id);
  }

  @Delete(":publicId/delete/:productId")
  @ApiResponse({ type: DeleteImageResponse, status: 200, description: "The images has been deleted" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiOperation({ summary: "Delete  image by public_id" })
  destroyimg(@Param("publicId") publicId: string, @Param("productid") productId: string) {
    return this.productService.deleteCloudImage(publicId, productId);
  }

}

