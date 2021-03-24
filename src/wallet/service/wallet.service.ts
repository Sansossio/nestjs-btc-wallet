import { Injectable } from '@nestjs/common'
import { RpcService } from '../../rpc/service/rpc.service'
import { v4 as uuidv4 } from 'uuid'
import { AvailableMethodsRpc } from '../../rpc/dto/available-methods.rpc'
import { GenerateWalletResponseDto } from '../dto/generate-wallet.response.dto'
import { GetWalletBalanceResponseDto } from '../dto/get-wallet-balance.response.dto'

@Injectable()
export class WalletService {
  constructor (
    private readonly rpcService: RpcService
  ) {}

  async generateNewWallet (): Promise<GenerateWalletResponseDto> {
    const walletName = uuidv4()

    return {
      walletName: (await this.rpcService.call<{ name: string }>(AvailableMethodsRpc.CREATEWALLET, [walletName])).name
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
}
