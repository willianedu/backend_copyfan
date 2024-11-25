
import { Column, Entity, PrimaryColumn} from "typeorm"

import { v4 as uuid } from "uuid"

@Entity("pagamento")
export class Pagamento {
    
    @PrimaryColumn()
    id: string

    @Column({ nullable: false })
    dataHoraPagamento: Date

    @Column()
    statusPagamento: boolean

    @Column({ nullable: false })
    valorTotal: number 

    @Column({ nullable: false })
    meioPagamento: string

    @Column()
    valores_id: string

    constructor(){
        this.id = uuid()
        this.statusPagamento = false
        this.dataHoraPagamento = new Date()
    }
}