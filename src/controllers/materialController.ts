import { Request, Response } from "express"
import { MaterialService } from "../services/materialService"

const service = new MaterialService()

export class MaterialController {
    async createMaterial(req: Request, res: Response){
        // Captura informações do formulário
        const { file,curso,turma,periodo,usuario_id } = req.body
        // Passa informações capturadas para o service
        const result = await service.createMaterial({file,curso,turma,periodo,usuario_id})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova Material, retorne-a para o usuário
        return res.status(201).json(result)
    }

    async readAllMaterial(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllMaterial()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No Materials found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOneMaterial(req: Request, res: Response){
        const { id } = req.params
        const result = await service.readOneMaterial({id})
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }
        return res.json(result)
    }

    async updateMaterial(req: Request, res: Response){
        const { id } = req.params
        const { file,curso,turma,periodo } = req.body
        const result = await service.updateMaterial({id, file,curso,turma,periodo})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deleteMaterial(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deleteMaterial({ id })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}