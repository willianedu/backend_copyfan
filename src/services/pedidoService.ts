import { DevDataSource } from "../connections/dbDev";
import { Pedido} from "../models/pedido";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Pedido)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newPedidoRequest = {
    qtd_folhas: number,
    qtd_copias: number,
    colorida: boolean
}

type findPedidoRequest = {
    id: string
}

type updatePedidoRequest = {
    id: string,
    statusPedido: boolean
}

export class PedidoService {
    async createPedido({ qtd_folhas,qtd_copias,colorida} : newPedidoRequest) : Promise<Pedido | Error> {
        try {
            // INSERT INTO Pedidos VALUES(description, date_Pedido)
            const pedido = cursor.create({
                qtd_folhas,qtd_copias,colorida
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(pedido)
            return pedido
        }
        catch(err){
            return new Error("Unexpected error saving Pedido!")
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