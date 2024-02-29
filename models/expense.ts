import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface expenseAttributes {
  id: string;
  name?: string;
  nominal: string;
  user_id?: string;
  category_id?: string;
  expense_datetime?: Date;
  created_at?: Date;
}

@Table({ tableName: 'expense', timestamps: false })
export class expense
  extends Model<expenseAttributes, expenseAttributes>
  implements expenseAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING })
  name?: string;

  @Column({ type: DataType.STRING })
  nominal!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'user_id', using: 'BTREE', order: 'ASC', unique: false })
  user_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'category_id', using: 'BTREE', order: 'ASC', unique: false })
  category_id?: string;

  @Column({ allowNull: true, type: DataType.DATE, defaultValue: DataType.NOW })
  expense_datetime?: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at?: Date;
}
