import { qualityEnum } from "../../Schema/quality.enum";
import { ApiProperty } from "@nestjs/swagger";
import { ApiModelPropertyOptional } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";


export class ProductResponse {

  @ApiProperty()
  name: string;
  @ApiModelPropertyOptional({
    enum: Object.keys(qualityEnum)
  })
  type: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  images: [];
  @ApiProperty()
  id: string;


}