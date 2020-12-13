import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Picture } from './picture.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Table
export class PictureTag extends Model<PictureTag> {
    @ForeignKey(() => Picture)
    @Column
    pictureId: number;

    @ForeignKey(() => Tag)
    @Column
    tagId: number;
}
