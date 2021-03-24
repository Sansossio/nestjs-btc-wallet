import { Module } from '@nestjs/common'
import { RpcModule } from '../rpc/rpc.module'
import { WalletController } from './controller/wallet.controller'
import { WalletService } from './service/wallet.service'

@Module({
  controllers: [
    WalletController
  ],
  imports: [
    RpcModule
  ],
  providers: [
    WalletService
  ]
})
export class WalletModule {}
