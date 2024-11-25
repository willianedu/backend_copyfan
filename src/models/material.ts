import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("material")
export class Material {
    
    @PrimaryColumn()
    id: string

    @Column({ type: "bytea" })
    file: Buffer;

    @Column()
    curso: string

    @Column()
    turma: string

    @Column()
    periodo: string

    @Column()
    usuario_id: string

    constructor(){
        this.id = uuid()
    }
}