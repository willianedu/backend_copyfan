
import {  Column, Entity, PrimaryColumn} from "typeorm"

@Entity("material_pedido")
export class MaterialPedido {
    
    @PrimaryColumn()
    id_material: string

    @PrimaryColumn()
    id_pedido: string

    @Column()
    frente_verso: boolean

    @Column()
    qtd_copias_colorida: string

    @Column()
    qtd_copias_pb: string

    @Column()
    encadernacao: boolean

    @Column()
    pagina_inicio: string

    @Column()
    pagina_fim: string

    constructor(){
    }
}