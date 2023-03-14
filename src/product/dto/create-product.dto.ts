import { qualityEnum } from "../../Schema/quality.enum";
import { ApiProperty } from "@nestjs/swagger";
import { ApiModelPropertyOptional } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";


export class CreateProductDto {
  @ApiProperty({
   
    example: "iphone"
  })

   name: string;
  @ApiModelPropertyOptional({
    required:true,
    example: qualityEnum.NEW,
    enum: Object.keys(qualityEnum),
    default:qualityEnum.NEW
  })
  type: string;

  @ApiProperty({ example: 20000 })
   price: number;




}
