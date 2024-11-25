import { DevDataSource } from "../connections/dbDev";
import { Pagamento} from "../models/pagamento";

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
    statusPagamento: boolean
}

export class PagamentoService {
    async createPagamento({ valorTotal,meioPagamento} : newPagamentoRequest) : Promise<Pagamento | Error> {
        try {
            // INSERT INTO Pagamentos VALUES(description, date_Pagamento)
            const pagamento = cursor.create({
                valorTotal,meioPagamento
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(pagamento)
            return pagamento
        }
        catch(err){
            return new Error("Unexpected error saving Pagamento!")
        }
    }
    
    async readOnePagamento({ id } : findPagamentoRequest) : Promise<Pagamento | Error> {
        try {
            // SELECT * FROM Pagamentos WHERE id = id LIMIT 1
            const pagamento = await cursor.findOne({ where: {id}})
            if(!pagamento) {
                return new Error("Pagamento not found!")
            }
            return pagamento
        }
        catch(err) {
            return new Error("Unexpected error reading Pagamento!")
        }
        
    }
    
    async readAllPagamento(): Promise<Pagamento[] | Error> {
        try {
            // SELECT * FROM Pagamentos
            const pagamentos = await cursor.find()
            return pagamentos
        } 
        catch(err){
            return new Error("Unexpected error reading Pagamentos!")
        }
    }
    
    async updatePagamento({ id, statusPagamento} : updatePagamentoRequest): Promise<Pagamento | Error> {
        try {
            // SELECT * FROM Pagamentos WHERE id = id LIMIT 1
            const pagamento = await cursor.findOne({ where: {id}})
            if(!pagamento) {
                return new Error("Pagamento not found!")
            }
            pagamento.statusPagamento = statusPagamento
            

            await cursor.save(pagamento)
            return pagamento
        } 
        catch(err){
            return new Error("Unexpected error updating Pagamento!")
        }
        
    }
    
    async deletePagamento({ id }:findPagamentoRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM Pagamentos WHERE id = id LIMIT 1
            const pagamento = await cursor.findOne({ where: {id}})
            if(!pagamento) {
                return new Error("Pagamento not found!")
            }
            await cursor.delete(pagamento.id)
            return "Pagamento removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting Pagamento!")
        }
    }
}