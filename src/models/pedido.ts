
import { stat } from "fs"
import { Column, Entity, PrimaryColumn} from "typeorm"

import { v4 as uuid } from "uuid"

@Entity("pedido")
export class Pedido {
    
    @PrimaryColumn()
    id: string

    @Column()
    dataHoraPedido: Date

    @Column()
    statusPedido: boolean

    @Column({nullable: false})
    pagamento_id: string

    @Column({nullable: false})
    usuario_id: string

    constructor(){
        this.id = uuid()
        this.dataHoraPedido = new Date()
        this.statusPedido = false
    }
}