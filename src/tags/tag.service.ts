import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PictureTag } from 'src/pictures/entities/picture-tag.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  async create(createTagDto: CreateTagDto) {
    await this.validateNameUniqueness(createTagDto.name);

    return await Tag.create(createTagDto);
  }

  async findAll() {
    return await Tag.findAll();
  }

  async findOne(id: number) {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      throw new NotFoundException("Tag not found.");
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<void> {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      throw new NotFoundException("Tag not found.");
    }

    if (updateTagDto.name !== tag.name) {
      await this.validateNameUniqueness(updateTagDto.name);
    }

    await tag.update(updateTagDto);
  }

  async remove(id: number): Promise<void> {
    const tag = await Tag.findOne({
      where: { id },
      include: [{
        model: Picture
      }]
    });

    if (!tag) {
      throw new NotFoundException("Tag not found.");
    }
    if (tag.pictures.length > 0) {
      throw new UnprocessableEntityException("Cannot delete tag. Tag used in picture(s).");
    }
    await tag.destroy();
  }

  private async validateNameUniqueness(name: string): Promise<void> {
    const existing = await Tag.findOne({ where: { name } });
    if (existing !== null) {
      throw new UnprocessableEntityException("Name is not unique.");
    }
  }
}
