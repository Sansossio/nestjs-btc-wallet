import { Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { WalletService } from '../service/wallet.service'

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor (
    private readonly service: WalletService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Generate a new btc wallet'
  })
  createNewWallet () {
    return this.service.generateNewWallet()
  }
}
