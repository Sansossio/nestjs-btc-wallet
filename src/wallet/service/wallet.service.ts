import { BadRequestException, Injectable } from '@nestjs/common'
import { RpcService } from '../../rpc/service/rpc.service'
import { v4 as uuidv4 } from 'uuid'
import { AvailableMethodsRpc } from '../../rpc/dto/available-methods.rpc'
import { GenerateWalletResponseDto } from '../dto/response/generate-wallet.response.dto'
import { GetWalletBalanceResponseDto } from '../dto/response/get-wallet-balance.response.dto'
import { GetWalletTransactionsResponseDto } from '../dto/response/get-wallet-transactions.response.dto'
import { SendToAddressRequestDto } from '../dto/request/send-to-address.request.dto'
import { SendToAddressResponseDto } from '../dto/response/send-to-address.response.dto'
import { SubtractFeeFromAmount } from '../dto/request/enum/fee.send-to-address.request.dto'

@Injectable()
export class WalletService {
  constructor (
    private readonly rpcService: RpcService
  ) {}

  async generateNewWallet (): Promise<GenerateWalletResponseDto> {
    const walletName = uuidv4()

    return {
      walletName: (await this.rpcService.call<{ name: string }>(AvailableMethodsRpc.CREATEWALLET, [walletName])).name,
      address: await this.rpcService.call<string>(AvailableMethodsRpc.GETNEWADDRESS, [], `wallet/${walletName}`)
    }
  }

  async getWalletsList (): Promise<string[]> {
    const wallets: string[] = await this.rpcService.call<string[]>(AvailableMethodsRpc.LISTWALLETS)

    return wallets.filter(wallet => !!wallet)
  }

  async getBalance (walletId: string): Promise<GetWalletBalanceResponseDto> {
    return {
      balance: await this.rpcService.call<number>(AvailableMethodsRpc.GETBALANCE, [], `wallet/${walletId}`)
    }
  }

  async getTransactions (walletId: string): Promise<GetWalletTransactionsResponseDto> {
    const path = `wallet/${walletId}`
    const [
      { balance },
      result
    ] = await Promise.all([
      this.getBalance(walletId),
      this.rpcService.call<any[]>(AvailableMethodsRpc.LISTTRANSACTIONS, [], path)
    ])

    return GetWalletTransactionsResponseDto.fromRpcResponse(balance, result)
  }

  async send (walletId: string, query: SendToAddressRequestDto): Promise<SendToAddressResponseDto> {
    const path = `wallet/${walletId}`
    const { balance } = await this.getBalance(walletId)

    if (query.amount > balance) {
      throw new BadRequestException('Insuficient founds')
    }

    const txid = await this.rpcService.call<string>(
      AvailableMethodsRpc.SENDTOADDRESS,
      [
        query.address,
        query.amount,
        query.comment,
        query.commentTo,
        query.subtractFeeFromAmount === SubtractFeeFromAmount.YES
      ],
      path
    )

    const transactionDetails = await this.rpcService.call<any>(AvailableMethodsRpc.GETTRANSACTION, [txid], path)

    return {
      txid: transactionDetails.txid,
      newBalance: (await this.getBalance(walletId)).balance,
      address: query.address,
      amountSpent: Math.abs(transactionDetails.amount) + Math.abs(transactionDetails.fee),
      amountReceive: Math.abs(transactionDetails.amount),
      fee: Math.abs(transactionDetails.fee),
      status: true
    }
  }
}
