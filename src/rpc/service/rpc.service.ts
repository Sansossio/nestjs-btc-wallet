import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import { AvailableMethodsRpc } from '../dto/available-methods.rpc'
import { ErrorRpc } from '../dto/error.rpc.dto'
import { RpcResponseDto } from '../dto/response.rpc.dto'

@Injectable()
export class RpcService {
  private readonly domain = this.config.get('rpc.domain')
  private readonly port = this.config.get('rpc.port')
  private readonly username = this.config.get('rpc.username')
  private readonly password = this.config.get('rpc.password')

  constructor (
    private readonly config: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async call <T> (method: AvailableMethodsRpc, params: any[] = [], path: string = '') {
    const url = `http://${this.username}:${this.password}@${this.domain}:${this.port}/${path}`

    try {
      const {
        data: response
      } = await this.httpService.post<RpcResponseDto>(
        url,
        {
          jsonrpc: '2.0',
          id: uuidv4(),
          method,
          params
        }
      ).toPromise()
      return response.result as T
    } catch (error) {
      throw ErrorRpc.fromRpcResponse(error.response.data)
    }
  }
}
