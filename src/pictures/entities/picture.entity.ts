import { Table, Column, Model, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { PictureLike } from './picture-like.entity';
import { PictureTag } from './picture-tag.entity';
import { Tag } from './tag.entity';

@Table
export class Picture extends Model<Picture> {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Tag, () => PictureTag)
    tags: Tag[];

    @BelongsToMany(() => User, () => PictureLike)
    likedBy: User[];

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}
