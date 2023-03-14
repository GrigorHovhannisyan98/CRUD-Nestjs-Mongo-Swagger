import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";
import { qualityEnum } from "./quality.enum";



export type productDocument = HydratedDocument<product>;

@Schema()
export class product {

    @Prop({required: true})
    name: string;

    @Prop({
        required: true,
        enum: Object.values(qualityEnum),
    })
    type: string;

    @Prop({required: true})
    price: number;
    @Prop()
    images:Array<string>



}

export const productSchema = SchemaFactory.createForClass(product);