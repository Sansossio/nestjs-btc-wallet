import { ApiProperty } from '@nestjs/swagger'

export class SendToAddressResponseDto {
  @ApiProperty()
  txid: string

  @ApiProperty()
  newBalance: number

  @ApiProperty()
  address: string

  @ApiProperty()
  amountSpent: number

  @ApiProperty()
  amountReceive: number

  @ApiProperty()
  fee: number

  @ApiProperty()
  status: boolean
}
