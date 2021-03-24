import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BlockModule } from './block/block.module'
import config from './config'
import { RpcModule } from './rpc/rpc.module'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config
    }),
    RpcModule,
    WalletModule,
    BlockModule
  ]
})
export class AppModule {}
