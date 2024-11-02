import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Put } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Post()
  create(@Body(ValidationPipe) createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  // @Get()
  // findAll() {
  //   return this.channelService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.channelService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateChannelDto: UpdateChannelDto) {
    return this.channelService.update(id, updateChannelDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.channelService.remove(+id);
  // }
}
