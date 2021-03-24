import { ApiProperty } from '@nestjs/swagger'

export class CountBlocksReponseDto {
  @ApiProperty()
  count: number
}
