import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RpcService } from './service/rpc.service'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot()
  ],
  providers: [
    RpcService
  ],
  exports: [
    RpcService
  ]
})
export class RpcModule {}
