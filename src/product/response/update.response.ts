import { ApiProperty } from "@nestjs/swagger";

export  class UpdateResponse{
  @ApiProperty()
  acknowledged:boolean;
  @ApiProperty()
  modifiedCount: number;
  @ApiProperty({example:null})
  upsertedId: boolean;
  @ApiProperty()
  upsertedCount: number;
  @ApiProperty()
  matchedCount: number
}