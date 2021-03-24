import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CountBlocksReponseDto } from '../dto/count-block.response.dto'
import { BlockService } from '../service/block.service'

@Controller('block')
@ApiTags('Blocks')
export class BlockController {
  constructor (
    private readonly service: BlockService
  ) {}

  @Get('count')
  @ApiOperation({
    summary: 'Get block count'
  })
  @ApiOkResponse({ type: CountBlocksReponseDto })
  count () {
    return this.service.countBlocks()
  }
}
