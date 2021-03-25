import { ApiProperty } from '@nestjs/swagger'

export class SendToAddressResponseDto {
  @ApiProperty()
  newBalance: number

  @ApiProperty()
  address: string

  @ApiProperty()
  amount: number

  @ApiProperty()
  status: boolean
}
