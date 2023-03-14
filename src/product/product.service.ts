import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { product, productDocument } from "../Schema/product.schema";
import { Images, ImagesDocument } from "../Schema/image.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(product.name) private productModel: Model<productDocument>,
    @InjectModel(Images.name) private ImagesModel: Model<ImagesDocument>,
    private cloudinary: CloudinaryService
  ) {
  }

  create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();

  }

  async uploadImage(file, product_id) {
    if (file && product_id) {
      try {
        const { public_id, secure_url } = await this.cloudinary.uploadImage(file);
        const uploadImage = new this.ImagesModel({ public_id, secure_url, product_id });
        await this.productModel.findByIdAndUpdate(
          product_id,
          { $push: { images: uploadImage } },
          { new: true }
        );
        return uploadImage.save();
      } catch (e) {
        throw  new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
      }
    } else {
      throw  new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCloudImage(public_id, product_id) {
    try {
      const deletresDb = await this.ImagesModel.deleteOne({ public_id: public_id });
      await this.productModel.findByIdAndUpdate(
        product_id,
        { $pull: { images: { public_id: public_id } } },
        { new: true });

      const deletresCloud = await this.cloudinary.deleteImage(public_id);
      return { deletresDb, deletresCloud };
    } catch (e) {
      throw e;
    }

  }

  findAll(): Promise<product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: string): Promise<product> {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({ _id: id }, { $set: updateProductDto });
  }

  async remove(id: string) {
    await this.ImagesModel.deleteMany({ product_id: id });
    return this.productModel.deleteOne({ _id: id });
  }
}
