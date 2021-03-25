import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CountBlocksReponseDto } from '../dto/count-block.response.dto'
import { GenerateBlocksRequestDto } from '../dto/generate-blocks.request.dto'
import { BlockService } from '../service/block.service'

@Controller('block')
@ApiTags('Blocks')
export class BlockController {
  constructor (
    private readonly service: BlockService
  ) {}

  @Get('generate')
  @ApiOperation({
    summary: 'Generate new blocks'
  })
  @ApiOkResponse({ type: CountBlocksReponseDto })
  generateBlock (
    @Query() query: GenerateBlocksRequestDto
  ) {
    return this.service.generateBlocks(query)
  }

  @Get('count')
  @ApiOperation({
    summary: 'Get block count'
  })
  @ApiOkResponse({ type: CountBlocksReponseDto })
  count () {
    return this.service.countBlocks()
  }
}
