import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface usersAttributes {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  image: string;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({ primaryKey: true, type: DataType.CHAR(36) })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  email?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  password?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ type: DataType.STRING(255) })
  image!: string;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
}
