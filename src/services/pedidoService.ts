import { DevDataSource } from "../connections/dbDev";
import { Pedido} from "../models/pedido";
import { Usuario } from "../models/usuario";
import { Pagamento } from "../models/pagamento";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Pedido)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newPedidoRequest = {
    pagamento_id: string,
    usuario_id: string
}

type findPedidoRequest = {
    id: string
}

type updatePedidoRequest = {
    id: string,
    statusPedido: boolean
}

export class PedidoService {
    async createPedido({ pagamento_id, usuario_id }: newPedidoRequest): Promise<Pedido | Error> {
        try {
            // Validação 1: Verificar se o usuário existe
            const usuario = await DevDataSource.getRepository(Usuario).findOne({ where: { id: usuario_id } });
            if (!usuario) {
                return new Error('Usuário não encontrado.');
            }

            // Validação 2: Verificar se o pagamento existe e não está vinculado a outro pedido
            const pagamento = await DevDataSource.getRepository(Pagamento).findOne({ where: { id: pagamento_id } });
            if (!pagamento) {
                return new Error('Pagamento não encontrado.');
            }

            // Validação 3: Regras de negócio (status do pagamento)
            if (!pagamento.statusPagamento) {
                return new Error('O pagamento ainda não foi concluído.');
            }

            // Criar o pedido
            const pedido = DevDataSource.getRepository(Pedido).create({ pagamento_id, usuario_id });
            await DevDataSource.getRepository(Pedido).save(pedido);

            return pedido;
        } catch (err) {
            console.error(err);
            return new Error('Erro inesperado ao salvar pedido.');
        }
    }
    
    async readOnePedido({ id } : findPedidoRequest) : Promise<Pedido | Error> {
        try {
            // SELECT * FROM Pedidos WHERE id = id LIMIT 1
            const pedido = await cursor.findOne({ where: {id}})
            if(!pedido) {
                return new Error("Pedido not found!")
            }
            return pedido
        }
        catch(err) {
            return new Error("Unexpected error reading Pedido!")
        }
        
    }
    
    async readAllPedido(): Promise<Pedido[] | Error> {
        try {
            // SELECT * FROM Pedidos
            const pedidos = await cursor.find()
            return pedidos
        } 
        catch(err){
            return new Error("Unexpected error reading Pedidos!")
        }
    }
    
    async updatePedido({ id, statusPedido} : updatePedidoRequest): Promise<Pedido | Error> {
        try {
            // SELECT * FROM Pedidos WHERE id = id LIMIT 1
            const pedido = await cursor.findOne({ where: {id}})
            if(!pedido) {
                return new Error("Pedido not found!")
            }
            pedido.statusPedido = statusPedido
            
            await cursor.save(pedido)
            return pedido
        } 
        catch(err){
            return new Error("Unexpected error updating Pedido!")
        }
        
    }
    
    async deletePedido({ id }:findPedidoRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM Pedidos WHERE id = id LIMIT 1
            const pedido = await cursor.findOne({ where: {id}})
            if(!pedido) {
                return new Error("Pedido not found!")
            }
            await cursor.delete(pedido.id)
            return "Pedido removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting Pedido!")
        }
    }
}