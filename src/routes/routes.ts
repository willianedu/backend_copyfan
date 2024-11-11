import { Router } from "express"
import { PagamentoController } from "../controllers/pagamentoController"
import { PerfilController } from "../controllers/perfilController"

const router = Router()
const controllerPagamento = new PagamentoController()
const controllerPerfil = new PerfilController()

// Rota da tela principal
router.get("/", (request, response) => {
  return response.json("home page")
})

// Rota Read All
router.get("/pagamentos", controllerPagamento.readAllPagamento)
// Rota Read One
router.get("/pagamentos/:id", controllerPagamento.readOnePagamento)
// Rota Create
router.post("/pagamentos", controllerPagamento.createPagamento)
// Rota Update
router.put("/pagamentos/:id", controllerPagamento.updatePagamento)
// Rota Delete
router.delete("/pagamentos/:id", controllerPagamento.deletePagamento)

// Rota Read All
router.get("/perfis", controllerPerfil.readAllPerfil)
// Rota Read One
router.get("/perfis/:id", controllerPerfil.readOnePerfil)
// Rota Create
router.post("/perfis", controllerPerfil.createPerfil)
// Rota Update
router.put("/perfis/:id", controllerPerfil.updatePerfil)
// Rota Delete
router.delete("/perfis/:id", controllerPerfil.deletePerfil)

export default router