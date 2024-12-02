import { DevDataSource } from "../connections/dbDev";
import { Pagamento} from "../models/pagamento";
import { Valores } from "../models/valores";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Pagamento)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newPagamentoRequest = {
    valorTotal: number 
    meioPagamento: string
    valores_id: string
}

type findPagamentoRequest = {
    id: string
}

type updatePagamentoRequest = {
    id: string
    statusPagamento: boolean
}

export class PagamentoService {
    async createPagamento({ valorTotal, meioPagamento, valores_id }: newPagamentoRequest): Promise<Pagamento | Error> {
        try {
            // Validação dos campos obrigatórios
            if (!valorTotal || typeof valorTotal !== "number" || valorTotal <= 0) {
                return new Error("Invalid valorTotal. It must be a positive number.");
            }
            
            const validMeiosPagamento = ["Cartão", "Dinheiro", "Pix"]; // Adapte conforme necessário
            if (!meioPagamento || !validMeiosPagamento.includes(meioPagamento)) {
                return new Error(`Invalid meioPagamento. Allowed values are: ${validMeiosPagamento.join(", ")}`);
            }
    
            if (!valores_id) {
                return new Error("valores_id is required.");
            }
    
            // Verifica se o valores_id existe no banco de dados
            const valor = await DevDataSource.getRepository(Valores).findOne({ where: { id: valores_id } });
            if (!valor) {
                return new Error("Invalid valores_id. Related record not found.");
            }
    
            // Cria o pagamento
            const pagamento = cursor.create({
                valorTotal,
                meioPagamento,
                valores_id,
            });
    
            // Salva o pagamento no banco de dados
            await cursor.save(pagamento);
    
            return pagamento;
        } catch (err) {
            console.error("Error saving Pagamento:", err); // Log detalhado para depuração
            return new Error("Unexpected error saving Pagamento!");
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