
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

    @Column()
    qtd_folhas: number

    @Column()
    qtd_copias: number

    @Column()
    colorida: boolean

    @Column()
    pagamento_id: string

    @Column()
    usuario_id: string

    constructor(){
        this.id = uuid()
        this.dataHoraPedido = new Date()
        this.statusPedido = false
        this.colorida = false
    }
}