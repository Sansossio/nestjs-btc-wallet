import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type, Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import { SubtractFeeFromAmount } from './enum/fee.send-to-address.request.dto'

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

  @ApiPropertyOptional({
    enum: Object.values(SubtractFeeFromAmount),
    example: SubtractFeeFromAmount.NO
  })
  @IsEnum(SubtractFeeFromAmount)
  @IsOptional()
  subtractFeeFromAmount: SubtractFeeFromAmount
}
