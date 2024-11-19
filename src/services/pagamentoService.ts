
import { Timestamp } from "typeorm";
import { DevDataSource } from "../connections/dbDev";
import { Pagamento } from "../models/pagamento";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Pagamento)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newPagamentoRequest = {

    valorTotal: number 
    meioPagamento: string

}

type findPagamentoRequest = {
    id: string
}

type updatePagamentoRequest = {

    id: string
}

export class PagamentoService {
    async createPagamento({valorTotal, meioPagamento} : newPagamentoRequest) : Promise<Pagamento | Error> {
        try {
            // INSERT INTO pagamentos VALUES(description, date_pagamento)
            const pagamento = cursor.create({
              valorTotal,meioPagamento

            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(pagamento)
            return pagamento
        }
        catch(err){

            return new Error("Unexpected error saving pagamento!")

        }
    }
    
    async readOnePagamento({ id } : findPagamentoRequest) : Promise<Pagamento | Error> {
        try {

            // SELECT * FROM pagamentos WHERE id = id LIMIT 1

            const pagamento = await cursor.findOne({ where: {id}})
            if(!pagamento) {
                return new Error("Pagamento not found!")
            }
            return pagamento
        }
        catch(err) {

            return new Error("Unexpected error reading pagamento!")

        }
        
    }
    
    async readAllPagamento(): Promise<Pagamento[] | Error> {
        try {

            // SELECT * FROM pagamentos

            const pagamentos = await cursor.find()
            return pagamentos
        } 
        catch(err){

            return new Error("Unexpected error reading pagamentos!")
        }
    }
    
    async updatePagamento({ id} : updatePagamentoRequest): Promise<Pagamento | Error> {
        try {
            // SELECT * FROM pagamentos WHERE id = id LIMIT 1

            const pagamento = await cursor.findOne({ where: {id}})
            if(!pagamento) {
                return new Error("Pagamento not found!")
            }
            // Se houver uma nova descrição e/ou data informados pelo usuário vindos da requisição, a tarefa será atualizada com os novos dados; senão, os dados antigos serão mantidos.

            //pagamento.status = status
            // UPDATE pagamentos WHERE id = id SET description = description, date_pagamento = date_pagamento

            await cursor.save(pagamento)
            return pagamento
        } 
        catch(err){

            return new Error("Unexpected error updating pagamento!")
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
    
    async deletePagamento({ id }:findPagamentoRequest): Promise<String | Error> { 
        try{

            // SELECT * FROM pagamentos WHERE id = id LIMIT 1

            const pagamento = await cursor.findOne({ where: {id}})
            if(!pagamento) {
                return new Error("Pagamento not found!")
            }
            await cursor.delete(pagamento.id)
            return "Pagamento removed successfully!"
        }
        catch(err){

            return new Error("Unexpected error deleting pagamento!")

        }
    }
}