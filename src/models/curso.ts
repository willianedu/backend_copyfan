
import { Column, Entity, PrimaryColumn} from "typeorm"

import { v4 as uuid } from "uuid"

@Entity("curso")
export class Curso {
    
    @PrimaryColumn()
    id: string

    @Column()
    descricao: string

    @Column()
    grau: string

    @Column()
    nivel_serie: string

    @Column()
    modalidade: string

    @Column()
    ativo: boolean

    constructor(){
        this.id = uuid()
    }
}