import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, HttpCode } from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Public } from 'src/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddPictureTagDto } from './dto/add-picture-tag.dto';
import { PictureTagService } from './picture-tags/picture-tag.service';
import { PictureLikeService } from './picture-likes/picture-like.service';

@UseGuards(JwtAuthGuard)
@Controller('pictures')
export class PictureController {
  constructor(
    private readonly pictureService: PictureService,
    private readonly pictureTagService: PictureTagService,
    private readonly pictureLikeService: PictureLikeService
  ) { }

  @Post()
  create(@Body() createPictureDto: CreatePictureDto, @Request() req) {
    return this.pictureService.create(createPictureDto, req.user.id);
  }

  @Public()
  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pictureService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto, @Request() req) {
    return this.pictureService.update(+id, updatePictureDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @Request() req) {
    return this.pictureService.remove(+id, req.user.id);
  }

  @Post(':id/tags')
  addPictureTag(@Param('id') id: string, @Body() addPictureTagDto: AddPictureTagDto, @Request() req) {
    return this.pictureTagService.addPictureTag(+id, addPictureTagDto, req.user.id);
  }

  @Delete(':id/tags/:tagId')
  @HttpCode(204)
  removePictureTag(@Param('id') id: string, @Param('tagId') tagId: string, @Request() req) {
    return this.pictureTagService.removePictureTag(+id, +tagId, req.user.id);
  }

  @Get(':id/likes')
  getPictureLike(@Param('id') id: string) {
    return this.pictureLikeService.getPictureLikes(+id);
  }

  @Post(':id/likes')
  addPictureLike(@Param('id') id: string, @Request() req) {
    return this.pictureLikeService.addPictureLike(+id, req.user.id);
  }

  @Delete(':id/likes')
  @HttpCode(204)
  removePictureLike(@Param('id') id: string, @Request() req) {
    return this.pictureLikeService.removePictureLike(+id, req.user.id);
  }
}
