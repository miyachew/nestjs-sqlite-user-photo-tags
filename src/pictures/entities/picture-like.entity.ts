import { Table, Column, Model, ForeignKey, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { User } from './../../users/entities/user.entity';
import { Picture } from './picture.entity';

@Table
export class PictureLike extends Model<PictureLike> {
    @ForeignKey(() => Picture)
    @Column
    pictureId: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @BelongsTo(() => User)
    user: User;
}
