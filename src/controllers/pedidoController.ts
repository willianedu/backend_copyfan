import { Request, Response } from "express"
import { PedidoService } from "../services/pedidoService"

const service = new PedidoService()

export class PedidoController {
    async createPedido(req: Request, res: Response){
        // Captura informações do formulário
        const { pagamento_id,usuario_id } = req.body
        // Passa informações capturadas para o service
        const result = await service.createPedido({pagamento_id,usuario_id})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova Pedido, retorne-a para o usuário
        return res.status(201).json(result)
    }
    
    async readAllPedido(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllPedido()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No Pedidos found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOnePedido(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        try {
            const result = await service.readOnePedido({ id });
            
            if (result instanceof Error) {
                return res.status(404).json({ error: result.message }); // Retorna imediatamente em caso de erro
            }
    
            return res.json(result); // Retorna o perfil caso não haja erro
        } catch (err) {
            console.error(err); // Log do erro para depuração
            return res.status(500).json({ error: "Unexpected error" }); // Retorna erro genérico em caso de exceção
        }
    }
    

    async updatePedido(req: Request, res: Response){
        const { id } = req.params
        const { statusPedido } = req.body
        const result = await service.updatePedido({id,statusPedido})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deletePedido(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deletePedido({ id })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}