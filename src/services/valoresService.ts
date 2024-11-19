import { Timestamp } from "typeorm";
import { DevDataSource } from "../connections/dbDev";
import { Valores } from "../models/valores";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Valores)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newValoresRequest = {
    descricao: string
    valor: number
}    

type findValoresRequest = {
    id: string
}

type updateValoresRequest = {
    id: string
    descricao: string
    valor: number 
}

export class ValoresService {
    async createValores({descricao, valor} : newValoresRequest) : Promise<Valores | Error> {
        try {
            // INSERT INTO valores VALUES(description, date_valores)
            const valores = cursor.create({
              descricao,valor
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(valores)
            return valores
        }
        catch(err){
            return new Error("Unexpected error saving valores!")
        }
    }
    
    async readOneValores({ id } : findValoresRequest) : Promise<Valores | Error> {
        try {
            // SELECT * FROM valoress WHERE id = id LIMIT 1
            const valores = await cursor.findOne({ where: {id}})
            if(!valores) {
                return new Error("Valores not found!")
            }
            return valores
        }
        catch(err) {
            return new Error("Unexpected error reading valores!")
        }
        
    }
    
    async readAllValores(): Promise<Valores[] | Error> {
        try {
            // SELECT * FROM valoress
            const valores = await cursor.find()
            return valores
        } 
        catch(err){
            return new Error("Unexpected error reading valoress!")
        }
    }
    
    async updateValores({ id , descricao, valor} : updateValoresRequest): Promise<Valores | Error> {
        try {
            // SELECT * FROM valoress WHERE id = id LIMIT 1
            const valores = await cursor.findOne({ where: {id}})
            if(!valores) {
                return new Error("Valores not found!")
            }
            // Se houver uma nova descrição e/ou data informados pelo usuário vindos da requisição, a tarefa será atualizada com os novos dados; senão, os dados antigos serão mantidos.
            valores.descricao = descricao
            valores.valor = valor 
            // UPDATE valoress WHERE id = id SET description = description, date_valores = date_valores
            await cursor.save(valores)
            return valores
        } 
        catch(err){
            return new Error("Unexpected error updating valores!")
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
    
    async deleteValores({ id }:findValoresRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM valoress WHERE id = id LIMIT 1
            const valores = await cursor.findOne({ where: {id}})
            if(!valores) {
                return new Error("Valores not found!")
            }
            await cursor.delete(valores.id)
            return "Valores removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting valores!")
        }
    }
}