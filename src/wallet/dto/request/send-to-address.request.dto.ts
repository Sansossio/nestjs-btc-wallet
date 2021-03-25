import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class SendToAddressRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  comment: string = ''

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  commentTo: string = ''

  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  subtractFeeFromAmount: boolean = false
}
