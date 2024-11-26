import { DevDataSource } from "../connections/dbDev";
import { Curso } from "../models/curso";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Curso)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newCursoRequest = {
    descricao: string,
    grau: string,
    nivel_serie: string,
    modalidade: string,
    ativo: boolean
}

type findCursoRequest = {
    id: string
}

type updateCursoRequest = {
    id: string,
    descricao: string,
    grau: string,
    nivel_serie: string,
    modalidade: string,
    ativo: boolean
}

export class CursoService {
    async createCurso({ descricao, grau, nivel_serie, modalidade, ativo }: newCursoRequest): Promise<Curso | Error> {
        try {
            // INSERT INTO Cursos VALUES(description, date_Curso)
            const curso = cursor.create({
                descricao, grau, nivel_serie, modalidade, ativo
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(curso)
            return curso
        }
        catch (err) {
            return new Error("Unexpected error saving Curso!")
        }
    }

    async readOneCurso({ id }: findCursoRequest): Promise<Curso | Error> {
        try {
            // SELECT * FROM Cursos WHERE id = id LIMIT 1
            const curso = await cursor.findOne({ where: { id } })
            if (!curso) {
                return new Error("Curso not found!")
            }
            return curso
        }
        catch (err) {
            return new Error("Unexpected error reading Curso!")
        }

    }

    async readAllCurso(): Promise<Curso[] | Error> {
        try {
            // SELECT * FROM Cursos
            const cursos = await cursor.find()
            return cursos
        }
        catch (err) {
            return new Error("Unexpected error reading Cursos!")
        }
    }

    async updateCurso({ id, descricao, grau, nivel_serie, modalidade, ativo }: updateCursoRequest): Promise<Curso | Error> {
        try {
            // SELECT * FROM Cursos WHERE id = id LIMIT 1
            const curso = await cursor.findOne({ where: { id } })
            if (!curso) {
                return new Error("Curso not found!")
            }
            curso.descricao = descricao
            curso.grau = grau
            curso.nivel_serie = nivel_serie
            curso.modalidade = modalidade
            curso.ativo = ativo


            await cursor.save(curso)
            return curso
        }
        catch (err) {
            return new Error("Unexpected error updating Curso!")
        }

    }

    async deleteCurso({ id }: findCursoRequest): Promise<String | Error> {
        try {
            // SELECT * FROM Cursos WHERE id = id LIMIT 1
            const curso = await cursor.findOne({ where: { id } })
            if (!curso) {
                return new Error("Curso not found!")
            }
            await cursor.delete(curso.id)
            return "Curso removed successfully!"
        }
        catch (err) {
            return new Error("Unexpected error deleting Curso!")
        }
    }
}