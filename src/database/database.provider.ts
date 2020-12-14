import { Sequelize } from 'sequelize-typescript';
import { PictureLike } from './../pictures/entities/picture-like.entity';
import { PictureTag } from './../pictures/entities/picture-tag.entity';
import { Picture } from './../pictures/entities/picture.entity';
import { User } from './../users/entities/user.entity';

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
            sequelize.addModels([User, Picture, PictureTag, PictureLike]);
            await sequelize.sync();
            return sequelize;
        },
    },
];