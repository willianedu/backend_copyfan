import { Request, Response } from "express"
import { PagamentoService } from "../services/pagamentoService"

const service = new PagamentoService()

export class PagamentoController {
    async createPagamento(req: Request, res: Response){
        // Captura informações do formulário
        const { valorTotal,meioPagamento } = req.body
        // Passa informações capturadas para o service
        const result = await service.createPagamento({valorTotal,meioPagamento})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova Pagamento, retorne-a para o usuário
        return res.status(201).json(result)
    }

    async readAllPagamento(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllPagamento()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No Pagamentos found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOnePagamento(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        try {
            const result = await service.readOnePagamento({ id });
            
            if (result instanceof Error) {
                return res.status(404).json({ error: result.message }); // Retorna imediatamente em caso de erro
            }
    
            return res.json(result); // Retorna o pagamento caso não haja erro
        } catch (err) {
            console.error(err); // Log do erro para depuração
            return res.status(500).json({ error: "Unexpected error" }); // Retorna erro genérico em caso de exceção
        }
    }
    

    async updatePagamento(req: Request, res: Response){
        const { id } = req.params
        const { statusPagamento } = req.body
        const result = await service.updatePagamento({id,statusPagamento})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deletePagamento(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deletePagamento({ id })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}