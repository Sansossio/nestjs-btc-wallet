import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GenerateWalletResponseDto } from '../dto/generate-wallet.response.dto'
import { GetWalletBalanceResponseDto } from '../dto/get-wallet-balance.response.dto'
import { GetWalletTransactionsResponseDto } from '../dto/get-wallet-transactions.response.dto'
import { WalletService } from '../service/wallet.service'

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor (
    private readonly service: WalletService
  ) {}

  @Get('list')
  @ApiOperation({
    summary: 'Get list of wallets'
  })
  @ApiOkResponse({ type: [String] })
  getWalletsList () {
    return this.service.getWalletsList()
  }

  @Get(':walletId/balance')
  @ApiOperation({
    summary: 'Get wallet balance'
  })
  @ApiOkResponse({ type: GetWalletBalanceResponseDto })
  getWalletBalance (
    @Param('walletId') walletId: string
  ) {
    return this.service.getBalance(walletId)
  }

  @Get(':walletId/transactions')
  @ApiOperation({
    summary: 'Get wallet transactions'
  })
  @ApiOkResponse({ type: GetWalletTransactionsResponseDto })
  getWalletTransactions (
    @Param('walletId') walletId: string
  ) {
    return this.service.getTransactions(walletId)
  }

  @Post()
  @ApiOperation({
    summary: 'Generate a new btc wallet'
  })
  @ApiOkResponse({ type: GenerateWalletResponseDto })
  createNewWallet () {
    return this.service.generateNewWallet()
  }
}
