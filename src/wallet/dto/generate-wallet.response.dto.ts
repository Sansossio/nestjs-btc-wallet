import { ApiProperty } from '@nestjs/swagger'

export class GenerateWalletResponseDto {
  @ApiProperty()
  walletName: string
}
