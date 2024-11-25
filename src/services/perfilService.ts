import { DevDataSource } from "../connections/dbDev";
import { Perfil} from "../models/perfil";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Perfil)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newPerfilRequest = {
    descricao: string,
    criar_usuario: boolean,
    editar_usuario: boolean,
    excluir_usuario: boolean,
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
    async createPerfil({ descricao,  criar_usuario, editar_usuario, excluir_usuario, ler_usuario} : newPerfilRequest) : Promise<Perfil | Error> {
        try {
            // INSERT INTO Perfils VALUES(description, date_Perfil)
            const perfil = cursor.create({
                descricao,  criar_usuario, editar_usuario, excluir_usuario, ler_usuario
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(perfil)
            return perfil
        }
        catch(err){
            return new Error("Unexpected error saving Perfil!")
        }
    }
    
    async readOnePerfil({ id } : findPerfilRequest) : Promise<Perfil | Error> {
        try {
            // SELECT * FROM Perfils WHERE id = id LIMIT 1
            const perfil = await cursor.findOne({ where: {id}})
            if(!perfil) {
                return new Error("Perfil not found!")
            }
            return perfil
        }
        catch(err) {
            return new Error("Unexpected error reading Perfil!")
        }
        
    }
    
    async readAllPerfil(): Promise<Perfil[] | Error> {
        try {
            // SELECT * FROM Perfils
            const perfils = await cursor.find()
            return perfils
        } 
        catch(err){
            return new Error("Unexpected error reading Perfils!")
        }
    }
    
    async updatePerfil({ id, descricao} : updatePerfilRequest): Promise<Perfil | Error> {
        try {
            // SELECT * FROM Perfils WHERE id = id LIMIT 1
            const perfil = await cursor.findOne({ where: {id}})
            if(!perfil) {
                return new Error("Perfil not found!")
            }
            perfil.descricao = descricao
            

            await cursor.save(perfil)
            return perfil
        } 
        catch(err){
            return new Error("Unexpected error updating Perfil!")
        }
        
    }
    
    async deletePerfil({ id }:findPerfilRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM Perfils WHERE id = id LIMIT 1
            const perfil = await cursor.findOne({ where: {id}})
            if(!perfil) {
                return new Error("Perfil not found!")
            }
            await cursor.delete(perfil.id)
            return "Perfil removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting Perfil!")
        }
    }
}