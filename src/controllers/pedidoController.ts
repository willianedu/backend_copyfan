import { Request, Response } from "express"
import { PedidoService } from "../services/pedidoService"

const service = new PedidoService()

export class PedidoController {
    async createPedido(req: Request, res: Response) {
        const { pagamento_id, usuario_id } = req.body;

        // Chama o serviço para criar o pedido
        const result = await service.createPedido({ pagamento_id, usuario_id });

        if (result instanceof Error) {
            // Retorna mensagens de erro personalizadas com status HTTP apropriado
            if (result.message === 'Usuário não encontrado.') {
                return res.status(404).json({ error: result.message });
            }
            if (result.message === 'Pagamento não encontrado.') {
                return res.status(404).json({ error: result.message });
            }
            if (result.message === 'O pagamento ainda não foi concluído.') {
                return res.status(400).json({ error: result.message });
            }

            // Caso erro genérico
            return res.status(500).json({ error: result.message });
        }

        // Retorna o pedido criado com status 201
        return res.status(201).json(result);
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