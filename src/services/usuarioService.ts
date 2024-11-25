import { DevDataSource } from "../connections/dbDev";
import { Usuario} from "../models/usuario";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Usuario)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newUsuarioRequest = {
    matricula: string,
    perfil_id: string
}

type findUsuarioRequest = {
    id: string
}

type updateUsuarioRequest = {
    id: string
    matricula: string
}

export class UsuarioService {
    async createUsuario({ matricula,perfil_id} : newUsuarioRequest) : Promise<Usuario | Error> {
        try {
            // INSERT INTO Usuarios VALUES(description, date_Usuario)
            const usuario = cursor.create({
                matricula,perfil_id
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(usuario)
            return usuario
        }
        catch(err){
            return new Error("Unexpected error saving Usuario!")
        }
    }
    
    async readOneUsuario({ id } : findUsuarioRequest) : Promise<Usuario | Error> {
        try {
            // SELECT * FROM Usuarios WHERE id = id LIMIT 1
            const usuario = await cursor.findOne({ where: {id}})
            if(!usuario) {
                return new Error("Usuario not found!")
            }
            return usuario
        }
        catch(err) {
            return new Error("Unexpected error reading Usuario!")
        }
        
    }
    
    async readAllUsuario(): Promise<Usuario[] | Error> {
        try {
            // SELECT * FROM Usuarios
            const usuarios = await cursor.find()
            return usuarios
        } 
        catch(err){
            return new Error("Unexpected error reading Usuarios!")
        }
    }
    
    async updateUsuario({ id, matricula} : updateUsuarioRequest): Promise<Usuario | Error> {
        try {
            // SELECT * FROM Usuarios WHERE id = id LIMIT 1
            const usuario = await cursor.findOne({ where: {id}})
            if(!usuario) {
                return new Error("Usuario not found!")
            }
            usuario.matricula = matricula
            

            await cursor.save(usuario)
            return usuario
        } 
        catch(err){
            return new Error("Unexpected error updating Usuario!")
        }
        
    }
    
    async deleteUsuario({ id }:findUsuarioRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM Usuarios WHERE id = id LIMIT 1
            const usuario = await cursor.findOne({ where: {id}})
            if(!usuario) {
                return new Error("Usuario not found!")
            }
            await cursor.delete(usuario.id)
            return "Usuario removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting Usuario!")
        }
    }
}