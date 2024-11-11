import { DevDataSource } from "../connections/dbDev";
import { Perfil } from "../models/perfil";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Perfil)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newPerfilRequest = {
    descricao: string
    criar_usuario: boolean
    editar_usuario: boolean
    excluir_usuario: boolean
    ler_usuario: boolean
}    

type findPerfilRequest = {
    id: string
}

type updatePerfilRequest = {
    id: string
    descricao: string
}

export class PerfilService {
    async createPerfil({descricao, criar_usuario, editar_usuario, excluir_usuario,ler_usuario} : newPerfilRequest) : Promise<Perfil | Error> {
        try {
            // INSERT INTO perfils VALUES(description, date_perfil)
            const perfil = cursor.create({
              descricao,criar_usuario,editar_usuario, excluir_usuario,ler_usuario
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(perfil)
            return perfil
        }
        catch(err){
            return new Error("Unexpected error saving perfil!")
        }
    }
    
    async readOnePerfil({ id } : findPerfilRequest) : Promise<Perfil | Error> {
        try {
            // SELECT * FROM perfils WHERE id = id LIMIT 1
            const perfil = await cursor.findOne({ where: {id}})
            if(!perfil) {
                return new Error("Perfil not found!")
            }
            return perfil
        }
        catch(err) {
            return new Error("Unexpected error reading perfil!")
        }
        
    }
    
    async readAllPerfil(): Promise<Perfil[] | Error> {
        try {
            // SELECT * FROM perfils
            const perfil = await cursor.find()
            return perfil
        } 
        catch(err){
            return new Error("Unexpected error reading perfils!")
        }
    }
    
    async updatePerfil({ id, descricao} : updatePerfilRequest): Promise<Perfil | Error> {
        try {
            // SELECT * FROM perfils WHERE id = id LIMIT 1
            const perfil = await cursor.findOne({ where: {id}})
            if(!perfil) {
                return new Error("Perfil not found!")
            }
            // Se houver uma nova descrição e/ou data informados pelo usuário vindos da requisição, a tarefa será atualizada com os novos dados; senão, os dados antigos serão mantidos.
            perfil.descricao = descricao
            // UPDATE perfils WHERE id = id SET description = description, date_perfil = date_perfil
            await cursor.save(perfil)
            return perfil
        } 
        catch(err){
            return new Error("Unexpected error updating perfil!")
        }

        // let x = 10

        // // SE..ENTÃO..SENÃO
        // if (x % 2 == 0) {
        //     console.log("par")
        // }
        // else {
        //     console.log("ímpar")
        // }

        // // OPERADOR TERNÁRIO
        // (x % 2 == 0) ? console.log("par") : console.log("ímpar")

        
    }
    
    async deletePerfil({ id }:findPerfilRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM perfils WHERE id = id LIMIT 1
            const perfil = await cursor.findOne({ where: {id}})
            if(!perfil) {
                return new Error("Perfil not found!")
            }
            await cursor.delete(perfil.id)
            return "Perfil removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting perfil!")
        }
    }
}