import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ImagesDocument = HydratedDocument<Images>

@Schema()
export class Images {
  @Prop({ isRequired: true })
  public_id: string;
  @Prop({ isRequired: true })
  secure_url: string;
  @Prop()
  product_id: string;

}


export const ImagesSchema = SchemaFactory.createForClass(Images);