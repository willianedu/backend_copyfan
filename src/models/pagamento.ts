import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("pagamento")
export class Pagamento {
    
    @PrimaryColumn()
    id: string

    @Column({ nullable: false })
    datahorapagamento: Timestamp

    @Column()
    statusPagamento: boolean

    @Column({ nullable: false })
    valorTotal: number 

    @Column({ nullable: false })
    meioPagamento: string

    constructor(){
        this.id = uuid()
        this.statusPagamento = false
    }
}