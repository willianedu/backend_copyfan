import { Request, Response } from "express"
import { UsuarioService } from "../services/usuarioService"

const service = new UsuarioService()

export class UsuarioController {
    async createUsuario(req: Request, res: Response){
        // Captura informações do formulário
        const {matricula,perfil_id } = req.body
        // Passa informações capturadas para o service
        const result = await service.createUsuario({matricula,perfil_id})
        // Se o resultado for uma instância de erro
        if (result instanceof Error) {
            // Retorna a mensagem do erro
            return res.status(500).json(result.message)
        }
        // Do contrário, se for uma nova Usuario, retorne-a para o usuário
        return res.status(201).json(result)
    }

    async readAllUsuario(req: Request, res: Response){
        // A variável "result" nesse caso será uma lista de tarefas
        const result = await service.readAllUsuario()
        if (result instanceof Error) {
            return res.status(500).json(result.message)
        }
        // Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para o usuário
            return res.status(200).json("No Usuarios found")
        }
        // Do contrário, devolva a lista para o usuário
        return res.status(200).json(result)
    }

    async readOneUsuario(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        try {
            const result = await service.readOneUsuario({ id });
            
            if (result instanceof Error) {
                return res.status(404).json({ error: result.message }); // Retorna imediatamente em caso de erro
            }
    
            return res.json(result); // Retorna o usuario caso não haja erro
        } catch (err) {
            console.error(err); // Log do erro para depuração
            return res.status(500).json({ error: "Unexpected error" }); // Retorna erro genérico em caso de exceção
        }
    }
    

    async updateUsuario(req: Request, res: Response){
        const { id } = req.params
        const { matricula } = req.body
        const result = await service.updateUsuario({id,matricula})
        if (result instanceof Error){
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deleteUsuario(req: Request, res: Response){
        const { id } = req.params
        const result = await service.deleteUsuario({ id })
        if (result instanceof Error) {
          return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
}