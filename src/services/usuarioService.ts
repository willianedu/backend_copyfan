import { DevDataSource } from "../connections/dbDev";
import { Usuario} from "../models/usuario";
import {Perfil} from "../models/perfil"

const perfilCursor = DevDataSource.getRepository(Perfil);

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
    async createUsuario({ matricula, perfil_id }: newUsuarioRequest): Promise<Usuario | Error> {
        try {
            // Valida se a matrícula já existe
            const existingUsuario = await cursor.findOne({ where: { matricula } });
            if (existingUsuario) {
                return new Error('Matrícula já está em uso.');
            }
    
            // Valida se o perfil existe
            const existingPerfil = await perfilCursor.findOne({ where: { id: perfil_id } });
            if (!existingPerfil) {
                return new Error('Perfil não encontrado.');
            }
    
            // Cria o usuário no banco
            const usuario = cursor.create({ matricula, perfil_id });
            await cursor.save(usuario);
    
            return usuario;
        } catch (err) {
            // Captura erros inesperados
            console.error(err);
            return new Error('Erro inesperado ao salvar usuário.');
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