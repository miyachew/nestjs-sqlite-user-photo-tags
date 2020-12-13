import { Table, Column, Model, CreatedAt, UpdatedAt, Length, BelongsToMany } from 'sequelize-typescript';
import { PictureTag } from '../../pictures/entities/picture-tag.entity';
import { Picture } from '../../pictures/entities/picture.entity';

@Table
export class Tag extends Model<Tag> {
    @Length({ min: 3, max: 50 })
    @Column
    name: string;

    @BelongsToMany(() => Picture, () => PictureTag)
    pictures: Picture[];

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}
