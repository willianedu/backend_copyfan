import { Router } from "express"
import { PagamentoController } from "../controllers/pagamentoController"

const router = Router()
const controller = new PagamentoController()

// Rota da tela principal
router.get("/", (request, response) => {
  return response.json("home page")
})

// Rota Read All
router.get("/pagamentos", controller.readAllPagamento)
// Rota Read One
router.get("/pagamentos/:id", controller.readOnePagamento)
// Rota Create
router.post("/pagamentos", controller.createPagamento)
// Rota Update
router.put("/pagamentos/:id", controller.updatePagamento)
// Rota Delete
router.delete("/pagamentos/:id", controller.deletePagamento)

export default router