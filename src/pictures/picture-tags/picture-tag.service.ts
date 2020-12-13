import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AddPictureTagDto } from '../dto/add-picture-tag.dto';
import { PictureTag } from '../entities/picture-tag.entity';
import { Picture } from '../entities/picture.entity';

@Injectable()
export class PictureTagService {
    async addPictureTag(pictureId: number, addPictureTagDto: AddPictureTagDto, userId: number): Promise<void> {
        const picture = await Picture.findOne({
            where: {
                id: pictureId,
                userId
            },
            include: [
                {
                    model: PictureTag,
                    attributes: ['id', 'tag']
                },
            ]
        });
        if (!picture) {
            throw new NotFoundException("Picture not found.");
        }

        if (picture.tags && picture.tags.length >= 10) {
            throw new UnprocessableEntityException("Exceeded max. tag allowed.");
        }

        const existingTag = picture.tags.filter(e => {
            return e.tag === addPictureTagDto.tag
        });
        if (existingTag.length <= 0) {
            await PictureTag.create({
                ...addPictureTagDto,
                pictureId: picture.id
            });
        }
    }

    async removePictureTag(pictureId: number, pictureTagId: number, userId: number): Promise<void> {
        const pictureTag = await PictureTag.findOne({
            where: {
                id: pictureTagId,
                '$picture.id$': pictureId,
                '$picture.userId$': userId
            },
            include: [
                {
                    model: Picture,
                    required: true
                },
            ]
        });

        if (!pictureTag) {
            throw new NotFoundException("Picture tag not found.");
        }
        await pictureTag.destroy();
    }
}
