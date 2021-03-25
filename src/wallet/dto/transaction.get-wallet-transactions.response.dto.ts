import { ApiProperty } from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'
import { TransactionTypeEnum } from './enum/transaction-type.enum'

export class TransactionGetWalletTransactionsResponseDto {
  @ApiProperty({ enum: TransactionTypeEnum })
  type: TransactionTypeEnum

  @ApiProperty()
  txid: string

  @ApiProperty()
  amount: number

  @ApiProperty()
  address: string

  @ApiProperty()
  confirmations: number

  @ApiProperty()
  date: Date

  private static parseTime (seconds: number) {
    return new Date(seconds * 1000)
  }

  static fromRpcResponse (result: any): TransactionGetWalletTransactionsResponseDto {
    const plain: TransactionGetWalletTransactionsResponseDto = {
      type: result.type === 'send' ? TransactionTypeEnum.SEND : TransactionTypeEnum.RECEIVE,
      txid: result.txid,
      amount: result.amount,
      address: result.address,
      confirmations: result.confirmations,
      date: this.parseTime(result.time)
    }

    return plainToClass(
      TransactionGetWalletTransactionsResponseDto,
      plain
    )
  }
}
