import { ApiProperty } from "@nestjs/swagger";


class deleteDB {
  @ApiProperty()
  acknowledged: boolean;
  @ApiProperty({ example: 1 })
  deletedCount: number;
}

class deletresCloud {
  @ApiProperty({ example: "ok" })
  result: string;
}

export class DeleteImageResponse {
  @ApiProperty()
  deleteDB: deleteDB;
  @ApiProperty()
  deletresCloud: deletresCloud;

}