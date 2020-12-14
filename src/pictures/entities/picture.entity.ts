import { Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { User } from './../../users/entities/user.entity';
import { PictureLike } from './picture-like.entity';
import { PictureTag } from './picture-tag.entity';

@Table
export class Picture extends Model<Picture> {
    @Column
    title: string;

    @Column
    description: string;

    @Column
    key: string;

    @Column
    url: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => PictureTag)
    tags: PictureTag[];

    @BelongsToMany(() => User, () => PictureLike)
    likedBy: User[];

    @HasMany(() => PictureLike)
    likes: PictureLike[];

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}
