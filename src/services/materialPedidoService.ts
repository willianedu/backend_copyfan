import { DevDataSource } from "../connections/dbDev";
import { MaterialPedido} from "../models/materialPedido";
import { Material } from "../models/material";
import { Pedido } from "../models/pedido";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(MaterialPedido)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newMaterialPedidoRequest = {
    id_material:string,
    id_pedido: string,
    frente_verso: boolean,
    qtd_copias_colorida: string,
    qtd_copias_pb: string,
    encadernacao: boolean,
    pagina_inicio: string,
    pagina_fim: string
}

type findMaterialPedidoRequest = {
    id_material: string,
    id_pedido: string
}

type updateMaterialPedidoRequest = {
    id_material: string,
    id_pedido: string,
    frente_verso: boolean,
    qtd_copias_colorida: string,
    qtd_copias_pb: string,
    encadernacao: boolean,
    pagina_inicio: string,
    pagina_fim: string
}


export class MaterialPedidoService {
    async createMaterialPedido({ frente_verso, qtd_copias_colorida, qtd_copias_pb, encadernacao, pagina_inicio, pagina_fim, id_material, id_pedido }: newMaterialPedidoRequest): Promise<MaterialPedido | Error> {
        try {
            // Verificar se o Material existe
            const material = await DevDataSource.getRepository(Material).findOne({ where: { id:id_material } });
            if (!material) {
                return new Error("Material not found!");
            }
    
            // Verificar se o Pedido existe
            const pedido = await DevDataSource.getRepository(Pedido).findOne({ where: { id:id_pedido } });
            if (!pedido) {
                return new Error("Pedido not found!");
            }
    
            // Criando o novo MaterialPedido
            const materialPedido = cursor.create({
                id_material,
                id_pedido,
                frente_verso,
                qtd_copias_colorida,
                qtd_copias_pb,
                encadernacao,
                pagina_inicio,
                pagina_fim
            });
    
            // Salvando no banco de dados
            await cursor.save(materialPedido);
    
            return materialPedido;
        } catch (err) {
            return new Error("Unexpected error saving MaterialPedido!");
        }
    }
    
    async readOneMaterialPedido({ id_pedido,id_material } : findMaterialPedidoRequest) : Promise<MaterialPedido | Error> {
        try {
            // SELECT * FROM MaterialPedidos WHERE id = id LIMIT 1
            const materialPedido = await cursor.findOne({
                where: [
                    { id_pedido }, // Busca por id_pedido
                    { id_material } // Busca por id_material
                ],
            });
            if(!materialPedido) {
                return new Error("MaterialPedido not found!")
            }
            return materialPedido
        }
        catch(err) {
            return new Error("Unexpected error reading MaterialPedido!")
        }
        
    }
    
    async readAllMaterialPedido(): Promise<MaterialPedido[] | Error> {
        try {
            // SELECT * FROM MaterialPedidos
            const materialPedidos = await cursor.find()
            return materialPedidos
        } 
        catch(err){
            return new Error("Unexpected error reading MaterialPedidos!")
        }
    }
    
    async updateMaterialPedido({ id_pedido,id_material,frente_verso, qtd_copias_colorida, qtd_copias_pb, encadernacao, pagina_inicio, pagina_fim} : updateMaterialPedidoRequest): Promise<MaterialPedido | Error> {
        try {
            // SELECT * FROM MaterialPedidos WHERE id = id LIMIT 1
            const materialPedido = await cursor.findOne({
                where: [
                    { id_pedido }, // Busca por id_pedido
                    { id_material } // Busca por id_material
                ],
            });
            if(!materialPedido) {
                return new Error("MaterialPedido not found!")
            }
            materialPedido.frente_verso = frente_verso
            materialPedido.qtd_copias_colorida = qtd_copias_colorida
            materialPedido.qtd_copias_pb = qtd_copias_pb
            materialPedido.encadernacao = encadernacao
            materialPedido.pagina_inicio = pagina_inicio
            materialPedido.pagina_fim = pagina_fim
            
            await cursor.save(materialPedido)
            return materialPedido
        } 
        catch(err){
            return new Error("Unexpected error updating MaterialPedido!")
        }
        
    }
    
    async deleteMaterialPedido({ id_pedido, id_material }: findMaterialPedidoRequest): Promise<string | Error> {
        try {
            // DELETE FROM MaterialPedidos WHERE id_pedido = ? AND id_material = ?
            const result = await cursor.delete({ id_pedido, id_material });
    
            if (result.affected === 0) {
                return new Error("MaterialPedido not found!");
            }
    
            return "MaterialPedido removed successfully!";
        } catch (err) {
            return new Error("Unexpected error deleting MaterialPedido!");
        }
    }
    
}