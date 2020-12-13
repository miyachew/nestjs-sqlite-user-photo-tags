import { Table, Column, Model, CreatedAt, UpdatedAt, Unique, PrimaryKey, HasMany, Scopes, AutoIncrement, DefaultScope, DataType } from 'sequelize-typescript';
import { Picture } from 'src/pictures/entities/picture.entity';

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

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}
