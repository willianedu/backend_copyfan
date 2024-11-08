import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("perfil")
export class Pagamento {
    
    @PrimaryColumn()
    id: string

    @Column({ nullable: false })
    descricao: string

    @Column()
    criar_usuario: boolean

    @Column()
    editar_usuario: boolean

    @Column()
    excluir_usuario: boolean

    @Column()
    ler_usuario: boolean

    constructor(){
        this.id = uuid()
        this.criar_usuario = false
        this.editar_usuario = false
        this.excluir_usuario = false
        this.ler_usuario = false
    }
}