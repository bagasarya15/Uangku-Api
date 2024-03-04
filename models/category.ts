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
import { users } from './users';
import { expense } from './expense';

export interface categoryAttributes {
  id: string;
  category_name?: string;
  category_type?: string;
  user_id?: string;
  created_at?: Date;
}

@Table({ tableName: 'category', timestamps: false })
export class category
  extends Model<categoryAttributes, categoryAttributes>
  implements categoryAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  category_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  category_type?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'user_id', using: 'BTREE', order: 'ASC', unique: false })
  user_id?: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at?: Date;

  @BelongsTo(() => users)
  user?: users;

  @HasMany(() => expense, { sourceKey: 'id' })
  expenses?: expense[];
}
