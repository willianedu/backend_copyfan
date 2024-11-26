import { Request, Response } from "express"
import { MaterialPedidoService } from "../services/materialPedidoService"

const service = new MaterialPedidoService()

export class MaterialPedidoController {
    async createMaterialPedido(req: Request, res: Response){
        // Captura informações do formulário
        const { frente_verso, qtd_copias_colorida, qtd_copis_pb, encadernacao, pagina_inicio, pagina_fim } = req.body
        // Passa informações capturadas para o service
        const result = await service.createMaterialPedido({frente_verso, qtd_copias_colorida, qtd_copis_pb, encadernacao, pagina_inicio, pagina_fim})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova MaterialPedido, retorne-a para o usuário
        return res.status(201).json(result)
    }

    async readAllMaterialPedido(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllMaterialPedido()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No MaterialPedidos found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOneMaterialPedido(req: Request, res: Response): Promise<Response> {
        const { id_pedido, id_material } = req.params;
        
        try {
            const result = await service.readOneMaterialPedido({ id_pedido,id_material });
            
            if (result instanceof Error) {
                return res.status(404).json({ error: result.message }); // Retorna imediatamente em caso de erro
            }
    
            return res.json(result); // Retorna o perfil caso não haja erro
        } catch (err) {
            console.error(err); // Log do erro para depuração
            return res.status(500).json({ error: "Unexpected error" }); // Retorna erro genérico em caso de exceção
        }
    }

    async updateMaterialPedido(req: Request, res: Response){
        const { id_pedido, id_material } = req.params
        const { frente_verso, qtd_copias_colorida, qtd_copis_pb, encadernacao, pagina_inicio, pagina_fim} = req.body
        const result = await service.updateMaterialPedido({id_pedido, id_material, frente_verso, qtd_copias_colorida, qtd_copis_pb, encadernacao, pagina_inicio, pagina_fim})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deleteMaterialPedido(req: Request, res: Response){
        const { id_material,id_pedido } = req.params
        const result = await service.deleteMaterialPedido({ id_material,id_pedido })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}