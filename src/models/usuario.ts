import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("usuario")
export class Usuario {
    @PrimaryColumn()
    id: string
    
    @Column({nullable: false})
    matricula: string
    
    @Column({nullable: false})
    perfil_id: string

    constructor() {
        this.id = uuid()
    }
}