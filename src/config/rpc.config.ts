import { registerAs } from '@nestjs/config'

export const rpcConfig = registerAs('rpc', () => ({
  domain: process.env.RPC_DOMAIN,
  port: process.env.RPC_PORT,
  username: process.env.RPC_USERNAME,
  password: process.env.RPC_PASSWORD
}))
