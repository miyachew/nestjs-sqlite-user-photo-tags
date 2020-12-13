import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { PictureLike } from '../entities/picture-like.entity';
import { Picture } from '../entities/picture.entity';

@Injectable()
export class PictureLikeService {
    async getPictureLikes(pictureId: number) {
        return await PictureLike.findAll({
            where: { pictureId },
            include: [
                {
                    model: User,
                    required: true,
                    attributes: ['name']
                },
            ]
        });
    }

    async addPictureLike(pictureId: number, userId: number): Promise<void> {
        const picture = await Picture.findOne({
            where: {
                id: pictureId,
            },
            include: [
                {
                    model: PictureLike,
                    where: {
                        userId
                    },
                    required: false
                },
            ]
        });
        if (!picture) {
            throw new NotFoundException("Picture not found.");
        }

        if (picture.likes.length <= 0) {
            await PictureLike.create({
                userId,
                pictureId: picture.id
            });
        }
    }

    async removePictureLike(pictureId: number, userId: number): Promise<void> {
        console.log('hey');
        console.log(pictureId, userId);

        await PictureLike.destroy({ where: { pictureId, userId } });
    }
}
