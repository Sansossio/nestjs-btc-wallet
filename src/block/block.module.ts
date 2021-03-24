import { Module } from '@nestjs/common'
import { RpcModule } from '../rpc/rpc.module'
import { BlockController } from './controller/block.controller'
import { BlockService } from './service/block.service'

@Module({
  controllers: [
    BlockController
  ],
  providers: [
    BlockService
  ]
})
export class BlockModule {}
