import { ApiProperty } from "@nestjs/swagger";

export class ImagesResponse {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  public_id: string;
  @ApiProperty()
  secure_url: string;
  @ApiProperty()
  product_id: string;


}