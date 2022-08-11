import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'spread' })
export class Spread extends Model<Spread> {
    @Column({ type: DataType.STRING, defaultValue: 'base', primaryKey: true })
    name: string;

    @Column({ type: DataType.DECIMAL, defaultValue: 0 })
    spread: number;
}
