import { RpcResponseDto, RpcResponseErrorDto } from './response.rpc.dto'

export class ErrorRpc {
  id: string
  code: number
  message: string

  static fromRpcResponse (response: RpcResponseDto) {
    return Object.assign(
      new ErrorRpc(),
      {
        id: response.id,
        code: response.error!.code,
        message: response.error!.message
      }
    )
  }
}
