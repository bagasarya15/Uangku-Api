import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { users } from './users';

export interface categoryAttributes {
  id: string;
  category_name?: string;
  category_type?: string;
  user_id?: string;
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

  @BelongsTo(() => users)
  user?: users;
}
