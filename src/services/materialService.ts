import { DevDataSource } from "../connections/dbDev";
import { Material   } from "../models/material";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Material)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newMaterialRequest = {
    file: File,
    curso: string,
    turma: string,
    periodo: string,
    usuario_id: string
}

type findMaterialRequest = {
    id: string
}

type updateMaterialRequest = {
    id: string
    file: File,
    curso: string,
    turma: string,
    periodo: string
}

export class MaterialService {
    async createMaterial({ file,curso,turma,periodo,usuario_id} : newMaterialRequest) : Promise<Material | Error> {
        try {
            // INSERT INTO Materials VALUES(description, date_Material)
            const material = cursor.create({
                file,curso,turma,periodo,usuario_id
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(material)
            return material
        }
        catch(err){
            return new Error("Unexpected error saving Material!")
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
    
    async updateMaterial({ id, file,curso,turma,periodo} : updateMaterialRequest): Promise<Material | Error> {
        try {
            // SELECT * FROM Materials WHERE id = id LIMIT 1
            const material = await cursor.findOne({ where: {id}})
            if(!material) {
                return new Error("Material not found!")
            }
            // Se houver uma nova descrição e/ou data informados pelo usuário vindos da requisição, a tarefa será atualizada com os novos dados; senão, os dados antigos serão mantidos.
            material.file = file
            material.curso = curso
            material.turma = turma
            material.periodo = periodo
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