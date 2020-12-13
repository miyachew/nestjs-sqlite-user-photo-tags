import { Sequelize } from 'sequelize-typescript';
import { PictureLike } from 'src/pictures/entities/picture-like.entity';
import { PictureTag } from 'src/pictures/entities/picture-tag.entity';
import { Picture } from 'src/pictures/entities/picture.entity';
import { Tag } from 'src/pictures/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                host: 'localhost',
                database: 'proj_db',
                storage: "./db/proj_db.sqlite"
            });
            sequelize.addModels([User, Picture, Tag, PictureTag, PictureLike]);
            await sequelize.sync();
            return sequelize;
        },
    },
];