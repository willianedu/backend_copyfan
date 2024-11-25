import { Request, Response } from "express"
import {ValoresService } from "../services/valoresService"

const service = new ValoresService()

export class ValoresController {
    async createValores(req: Request, res: Response){
        // Captura informações do formulário
        const { descricao, valor} = req.body
        // Passa informações capturadas para o service
        const result = await service.createValores({ descricao, valor})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova Valores, retorne-a para o usuário
        return res.status(201).json(result)
    }

    async readAllValores(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllValores()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No valoress found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOneValores(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        try {
            const result = await service.readOneValores({ id });
            
            if (result instanceof Error) {
                return res.status(404).json({ error: result.message }); // Retorna imediatamente em caso de erro
            }
    
            return res.json(result); // Retorna o perfil caso não haja erro
        } catch (err) {
            console.error(err); // Log do erro para depuração
            return res.status(500).json({ error: "Unexpected error" }); // Retorna erro genérico em caso de exceção
        }
    }

    async updateValores(req: Request, res: Response){
        const { id } = req.params
        const { descricao,valor } = req.body
        const result = await service.updateValores({id, descricao, valor})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deleteValores(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deleteValores({ id })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}