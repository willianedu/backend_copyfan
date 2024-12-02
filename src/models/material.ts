import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("material")
export class Material {
    
    @PrimaryColumn()
    id: string

    @Column({ type: "bytea" })
    file: Buffer;

    @Column({nullable: false})
    curso_id: string

    @Column()
    turma_periodo:string

    @Column({nullable: false})
    usuario_id: string

    constructor(){
        this.id = uuid()
    }
}