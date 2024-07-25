import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface users_tokenAttributes {
  id?: number;
  user_id: string;
  token: string;
  secret_key: string;
}

@Table({ tableName: 'users_token', timestamps: false })
export class users_token
  extends Model<users_tokenAttributes, users_tokenAttributes>
  implements users_tokenAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;

  @Column({ type: DataType.STRING(255) })
  user_id!: string;

  @Column({ type: DataType.STRING })
  token!: string;

  @Column({ type: DataType.STRING })
  secret_key!: string;
}
