import { Request, Response } from "express"
import { CursoService } from "../services/cursoService"

const service = new CursoService()

export class CursoController {
    async createCurso(req: Request, res: Response){
        // Captura informações do formulário
        const { descricao, grau, nivel_serie, modalidade,ativo } = req.body
        // Passa informações capturadas para o service
        const result = await service.createCurso({descricao, grau, nivel_serie, modalidade,ativo})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova Curso, retorne-a para o usuário
        return res.status(201).json(result)
    }

    async readAllCurso(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllCurso()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No Cursos found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOneCurso(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        try {
            const result = await service.readOneCurso({ id });
            
            if (result instanceof Error) {
                return res.status(404).json({ error: result.message }); // Retorna imediatamente em caso de erro
            }
    
            return res.json(result); // Retorna o curso caso não haja erro
        } catch (err) {
            console.error(err); // Log do erro para depuração
            return res.status(500).json({ error: "Unexpected error" }); // Retorna erro genérico em caso de exceção
        }
    }
    

    async updateCurso(req: Request, res: Response){
        const { id } = req.params
        const { descricao, grau, nivel_serie, modalidade, ativo } = req.body
        const result = await service.updateCurso({id,descricao, grau, nivel_serie, modalidade, ativo})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deleteCurso(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deleteCurso({ id })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}