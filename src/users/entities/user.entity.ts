import { Table, Column, Model, CreatedAt, UpdatedAt, Unique, HasMany, Scopes } from 'sequelize-typescript';
import { PictureLike } from './../../pictures/entities/picture-like.entity';
import { Picture } from './../../pictures/entities/picture.entity';

@Scopes(() => ({
    excludeHidden: {
        attributes: { exclude: ['password'] },
    },
}))

@Table
export class User extends Model<User> {
    @Column
    name: string;

    @Unique
    @Column
    username: string;

    @Column
    password: string;

    @Column({ defaultValue: true })
    isActive: boolean;

    @HasMany(() => Picture)
    pictures: Picture[];

    @HasMany(() => PictureLike)
    pictureLikes: PictureLike[];

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}
