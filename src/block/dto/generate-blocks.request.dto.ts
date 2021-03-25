import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator'

const MOCKED_ADDRESS = 'bcrt1q60dsqca7k7q803t7dhnh5se5jxf6atu5m2nf3p'

export class GenerateBlocksRequestDto {
  @ApiProperty({ example: MOCKED_ADDRESS })
  @IsString()
  @IsNotEmpty()
  address: string = MOCKED_ADDRESS

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  blocks: number = 1
}
