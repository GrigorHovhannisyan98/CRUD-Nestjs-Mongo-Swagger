import { ApiProperty } from "@nestjs/swagger";

export class DeleteResponse {
  @ApiProperty()
  acknowledged: boolean;
  @ApiProperty({ example: 1 })
  deletedCount: number;

}