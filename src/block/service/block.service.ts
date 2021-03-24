import { Injectable } from '@nestjs/common'
import { AvailableMethodsRpc } from '../../rpc/dto/available-methods.rpc'
import { RpcService } from '../../rpc/service/rpc.service'
import { CountBlocksReponseDto } from '../dto/count-block.response.dto'

@Injectable()
export class BlockService {
  constructor (
    private readonly rpcService: RpcService
  ) {}

  async countBlocks (): Promise<CountBlocksReponseDto> {
    return {
      count: await this.rpcService.call<number>(AvailableMethodsRpc.GETBLOCKCOUNT)
    }
  }
}
