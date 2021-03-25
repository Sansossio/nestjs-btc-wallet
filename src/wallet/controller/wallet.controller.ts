import { Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiErrorResponse } from '../../decorators/api-error-response.decorator'
import { SendToAddressRequestDto } from '../dto/request/send-to-address.request.dto'
import { GenerateWalletResponseDto } from '../dto/response/generate-wallet.response.dto'
import { GetWalletBalanceResponseDto } from '../dto/response/get-wallet-balance.response.dto'
import { GetWalletTransactionsResponseDto } from '../dto/response/get-wallet-transactions.response.dto'
import { SendToAddressResponseDto } from '../dto/response/send-to-address.response.dto'
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

  @Post(':walletId/send')
  @ApiOperation({
    summary: 'Send bitcoins to address'
  })
  @ApiOkResponse({ type: SendToAddressResponseDto })
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST
  )
  send (
    @Param('walletId') walletId: string,
    @Query() query: SendToAddressRequestDto
  ) {
    return this.service.send(walletId, query)
  }
}
