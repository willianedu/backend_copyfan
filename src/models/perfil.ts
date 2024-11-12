import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("perfil")
export class Perfil {
    
    @PrimaryColumn()
    id: string

    @Column()
    descricao: string

    @Column()
    criar_usuario: boolean

    @Column()
    editar_usuario: boolean

    @Column()
    excluir_usuario: boolean

    @Column()
    ler_boolean: boolean

    constructor(){
        this.id = uuid()
    }
}