import { ApiProperty } from '@nestjs/swagger'
import { plainToClass, Type } from 'class-transformer'
import { TransactionGetWalletTransactionsResponseDto } from './transaction.get-wallet-transactions.response.dto'

export class GetWalletTransactionsResponseDto {
  @ApiProperty()
  balance: number

  @ApiProperty({
    type: [TransactionGetWalletTransactionsResponseDto]
  })
  @Type(() => TransactionGetWalletTransactionsResponseDto)
  transactions: TransactionGetWalletTransactionsResponseDto[]

  static fromRpcResponse (balance: number, result: any[]): GetWalletTransactionsResponseDto {
    const transactions = result
      .map(val => TransactionGetWalletTransactionsResponseDto.fromRpcResponse(val))
      .sort((a, b) => b.date.getTime() - a.date.getTime())

    const plain: GetWalletTransactionsResponseDto = {
      balance,
      transactions
    }

    return plainToClass(
      GetWalletTransactionsResponseDto,
      plain
    )
  }
}
