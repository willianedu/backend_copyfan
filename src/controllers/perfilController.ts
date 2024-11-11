import { Request, Response } from "express"
import { PerfilService } from "../services/perfilService"

const service = new PerfilService()

export class PerfilController {
    async createPerfil(req: Request, res: Response){
        // Captura informações do formulário
        const {  descricao, criar_usuario, editar_usuario, excluir_usuario,  ler_usuario} = req.body
        // Passa informações capturadas para o service
        const result = await service.createPerfil({descricao, criar_usuario, editar_usuario, excluir_usuario,  ler_usuario})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova Perfil, retorne-a para o usuário
        return res.status(201).json(result)
    }

    async readAllPerfil(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllPerfil()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No perfils found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOnePerfil(req: Request, res: Response){
        const { id } = req.params
        const result = await service.readOnePerfil({id})
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }
        return res.json(result)
    }

    async updatePerfil(req: Request, res: Response){
        const { id } = req.params
        //const { status } = req.body
        const result = await service.updatePerfil({id})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deletePerfil(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deletePerfil({ id })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}