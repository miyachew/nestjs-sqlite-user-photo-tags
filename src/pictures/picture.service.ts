import { Injectable, NotFoundException, ServiceUnavailableException, UnprocessableEntityException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/entities/user.entity';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { PictureLike } from './entities/picture-like.entity';
import { PictureTag } from './entities/picture-tag.entity';
import { Picture } from './entities/picture.entity';
import * as path from 'path';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ConfigService } from './../config/config.service';

@Injectable()
export class PictureService {
  private s3Bucket: string

  constructor(
    private configService: ConfigService
  ) {
    this.s3Bucket = this.configService.get('S3_BUCKET_NAME');
  }

  async create(createPictureDto: CreatePictureDto, userId: number, image: any) {
    const uploadedImage = await this.uploadImage(image);
    const picture = await Picture.create({
      ...createPictureDto,
      userId,
      key: uploadedImage.Key,
      url: uploadedImage.Location
    });
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

  async findAllPaginated(limit: number, offset: number) {
    return await Picture.findAll({
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
      ],
      order: [['creationDate', 'DESC']],
      limit: limit,
      offset: offset
    });
  }

  async findOne(id: number) {
    const picture = await Picture.findOne({
      where: {
        id
      },
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
          as: 'likes',
          attributes: []
        },
      ],
      group: ['Picture.id', 'tags.id']
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

    await this.removeImage(picture.key);
    await PictureLike.destroy({ where: { pictureId: picture.id } });
    await PictureTag.destroy({ where: { pictureId: picture.id } });
    await picture.destroy();
  }

  async uploadImage(image: any) {
    if (!image) {
      throw new UnprocessableEntityException("Please upload an image.");
    }
    const ext = path.extname(image.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      throw new UnprocessableEntityException("Only images are allowed");
    }

    try {
      const s3 = new S3();
      return await s3.upload({
        Bucket: this.s3Bucket,
        Body: image.buffer,
        Key: `${uuid()}-${image.originalname}`,
        ACL: 'public-read'
      }).promise();
    } catch (error) {
      throw new ServiceUnavailableException("Upload image failed");
    }
  }

  async removeImage(key: string) {
    try {
      const s3 = new S3();
      await s3.deleteObject({
        Bucket: this.s3Bucket,
        Key: key
      }).promise();
    } catch (error) {
      throw new ServiceUnavailableException("Remove image failed");
    }
  }
}
