import { DevDataSource } from "../connections/dbDev";
import { Material   } from "../models/material";
import { Curso } from "../models/curso";
import { Usuario } from "../models/usuario";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Material)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newMaterialRequest = {
    file: Buffer,
    curso_id: string,
    turma_periodo: string,
    usuario_id: string
}

type findMaterialRequest = {
    id: string
}

type updateMaterialRequest = {
    id: string
    file: Buffer,
    turma_periodo: string
}

export class MaterialService {
    async createMaterial({
        file,
        curso_id,
        turma_periodo,
        usuario_id,
    }: newMaterialRequest): Promise<Material | Error> {
        try {
            // Validação básica dos campos obrigatórios
            if (!file || typeof file !== "string") {
                return new Error("Invalid or missing file.");
            }
            if (!curso_id) {
                return new Error("curso_id is required.");
            }
            if (!turma_periodo) {
                return new Error("turma_periodo is required.");
            }
            if (!usuario_id) {
                return new Error("usuario_id is required.");
            }
    
            // Verificar se o Curso existe
            const curso = await DevDataSource.getRepository(Curso).findOne({
                where: { id: curso_id },
            });
            if (!curso) {
                return new Error("Curso not found!");
            }
            // Verificar se o Usuário existe
            const usuario = await DevDataSource.getRepository(Usuario).findOne({
                where: { id: usuario_id },
            });
            if (!usuario) {
                return new Error("Usuario not found!");
            }
    
            // Criando o novo Material
            const material = cursor.create({
                file,
                curso_id,
                turma_periodo,
                usuario_id,
            });
    
            // Salvando no banco de dados
            await cursor.save(material);
    
            return material;
        } catch (err) {
            console.error("Error creating Material:", err);
            return new Error("Unexpected error saving Material!");
        }
    }
    
    
    async readOneMaterial({ id } : findMaterialRequest) : Promise<Material | Error> {
        try {
            // SELECT * FROM Materials WHERE id = id LIMIT 1
            const material = await cursor.findOne({ where: {id}})
            if(!material) {
                return new Error("Material not found!")
            }
            return material
        }
        catch(err) {
            return new Error("Unexpected error reading Material!")
        }
        
    }
    
    async readAllMaterial(): Promise<Material[] | Error> {
        try {
            // SELECT * FROM Materials
            const materials = await cursor.find()
            return materials
        } 
        catch(err){
            return new Error("Unexpected error reading Materials!")
        }
    }
    
    async updateMaterial({ id, file,turma_periodo} : updateMaterialRequest): Promise<Material | Error> {
        try {
            // SELECT * FROM Materials WHERE id = id LIMIT 1
            const material = await cursor.findOne({ where: {id}})
            if(!material) {
                return new Error("Material not found!")
            }
            // Se houver uma nova descrição e/ou data informados pelo usuário vindos da requisição, a tarefa será atualizada com os novos dados; senão, os dados antigos serão mantidos.
            material.file = file
            material.turma_periodo = turma_periodo
            // UPDATE Materials WHERE id = id SET description = description, date_Material = date_Material
            await cursor.save(material)
            return material
        } 
        catch(err){
            return new Error("Unexpected error updating Material!")
        }
        
    }
    
    async deleteMaterial({ id }:findMaterialRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM Materials WHERE id = id LIMIT 1
            const material = await cursor.findOne({ where: {id}})
            if(!material) {
                return new Error("Material not found!")
            }
            await cursor.delete(material.id)
            return "Material removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting Material!")
        }
    }
}