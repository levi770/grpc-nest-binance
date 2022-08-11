import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface UserCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id: string

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email!: string

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string
}
