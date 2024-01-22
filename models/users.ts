import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { roles } from './roles';
import { category } from './category';

export interface usersAttributes {
  id: string;
  username?: string;
  password?: string;
  role_id?: string;
  email?: string;
  name: string;
  image?: string;
  is_active?: number;
  created_at?: Date;
  update_at?: Date;
}

@Table({ tableName: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'username', using: 'BTREE', order: 'ASC', unique: true })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  password?: string;

  @ForeignKey(() => roles)
  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'role_id', using: 'BTREE', order: 'ASC', unique: false })
  role_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  email?: string;

  @Column({ type: DataType.STRING(255) })
  name!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  image?: string;

  @Column({ allowNull: true, type: DataType.TINYINT })
  is_active?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  update_at?: Date;

  @BelongsTo(() => roles)
  role?: roles;

  @HasMany(() => category, { sourceKey: 'id' })
  categories?: category[];
}
