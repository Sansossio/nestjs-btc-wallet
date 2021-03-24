import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './config'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [
    WalletModule,
    ConfigModule.forRoot({
      load: config
    })
  ]
})
export class AppModule {}
