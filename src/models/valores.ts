import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("valores")
export class Valores {
    
    @PrimaryColumn()
    id: string

    @Column({ nullable: false })
    descricao: string

    @Column()
    valor: number

    @Column()
    data_inicio: Date

    @Column()
    data_fim: Date

    constructor(){
        this.id = uuid(),
        this.data_inicio = new Date()
        this.data_fim = new Date()
    }
}