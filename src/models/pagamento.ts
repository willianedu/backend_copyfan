import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("pagamento")
export class Pagamento {
    
    @PrimaryColumn()
    id: string

    @Column()
    datahorapagamento: Date

    @Column()
    statusPagamento: boolean

    @Column()
    valorTotal: number

    @Column()
    meioPagamento: string

    @Column()
    valores_id: string

    constructor(){
        this.id = uuid()
        this.statusPagamento = false
        this.datahorapagamento = new Date()
    }
}