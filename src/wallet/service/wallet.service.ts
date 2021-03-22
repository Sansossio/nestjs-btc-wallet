import { Injectable } from '@nestjs/common'
import * as Bitcore from 'bitcore-lib'

@Injectable()
export class WalletService {
  async generateNewWallet () {
    const privateKey = new Bitcore.PrivateKey()
    const publicKey = privateKey.toAddress().toString()
    return {
      publicKey,
      privateKey: privateKey.toWIF()
    }
  }
}
