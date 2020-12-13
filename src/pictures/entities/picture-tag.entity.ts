import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Picture } from './picture.entity';

@Table
export class PictureTag extends Model<PictureTag> {
    @ForeignKey(() => Picture)
    @Column
    pictureId: number;

    @Column
    tag: string;

    @BelongsTo(() => Picture)
    picture: Picture;
}
