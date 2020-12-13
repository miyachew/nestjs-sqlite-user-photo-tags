import { Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { User } from 'src/users/entities/user.entity';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { PictureLike } from './entities/picture-like.entity';
import { PictureTag } from './entities/picture-tag.entity';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PictureService {
  async create(createPictureDto: CreatePictureDto, userId: number) {
    const picture = await Picture.create({ ...createPictureDto, userId });
    if (createPictureDto.tags) {
      const toInsert = [];
      createPictureDto.tags.map(tag => {
        toInsert.push({
          pictureId: picture.id,
          tag
        });
      });

      PictureTag.bulkCreate(toInsert);
    }
    return picture;
  }

  async findAll() {
    return await Picture.findAll({
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("likes.pictureId")), "totalLikes"]]
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        },
        {
          model: PictureTag,
          attributes: ['id', 'tag']
        },
        {
          model: PictureLike,
          as: 'likes'
        },
      ],
      group: ['Picture.id', 'tags.id']
    });
  }

  async findOne(id: number) {
    const picture = await Picture.findOne({
      where: {
        id
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        },
        {
          model: PictureTag,
          attributes: ['id', 'tag']
        },
        {
          model: PictureLike,
          as: 'likes'
        },
      ]
    });
    if (!picture) {
      throw new NotFoundException("Picture not found.");
    }
    return picture;
  }

  async update(id: number, updatePictureDto: UpdatePictureDto, userId: number): Promise<void> {
    const picture = await Picture.findOne({
      where: {
        id,
        userId
      }
    });
    if (!picture) {
      throw new NotFoundException("Picture not found.");
    }
    await picture.update(updatePictureDto);
  }

  async remove(id: number, userId: number): Promise<void> {
    const picture = await Picture.findOne({
      where: {
        id,
        userId
      },
      include: [
        {
          model: PictureTag
        },
        {
          model: PictureLike,
          as: 'likes'
        },
      ]
    });
    if (!picture) {
      throw new NotFoundException("Picture not found.");
    }

    await PictureLike.destroy({ where: { pictureId: picture.id } });
    await PictureTag.destroy({ where: { pictureId: picture.id } });
    await picture.destroy();
  }
}
