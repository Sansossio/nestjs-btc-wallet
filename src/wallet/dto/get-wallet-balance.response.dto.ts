import { ApiProperty } from '@nestjs/swagger'

export class GetWalletBalanceResponseDto {
  @ApiProperty()
  balance: number
}
