import { Router } from "express"
import { PagamentoController } from "../controllers/pagamentoController"
import { PerfilController } from "../controllers/perfilController"
import { MaterialController } from "../controllers/materialController"

const router = Router()
const pagamentoController = new PagamentoController()
const perfilController = new PerfilController()
const materialController = new MaterialController()

// Rota da tela principal
router.get("/", (request, response) => {
  return response.json("home page")
})

// Rota Read All
router.get("/pagamentos", pagamentoController.readAllPagamento)
// Rota Read One
router.get("/pagamentos/:id", pagamentoController.readOnePagamento)
// Rota Create
router.post("/pagamentos", pagamentoController.createPagamento)
// Rota Update
router.put("/pagamentos/:id", pagamentoController.updatePagamento)
// Rota Delete
router.delete("/pagamentos/:id", pagamentoController.deletePagamento)


// Rota Read All
router.get("/perfis", perfilController.readAllPerfil)
// Rota Read One
router.get("/perfis/:id", perfilController.readOnePerfil)
// Rota Create
router.post("/perfis", perfilController.createPerfil)
// Rota Update
router.put("/perfis/:id", perfilController.updatePerfil)
// Rota Delete
router.delete("/perfis/:id", perfilController.deletePerfil)

// Rota Read All
router.get("/materiais", materialController.readAllMaterial)
// Rota Read One
router.get("/materiais/:id", materialController.readOneMaterial)
// Rota Create
router.post("/materiais", materialController.createMaterial)
// Rota Update
router.put("/materiais/:id", materialController.updateMaterial)
// Rota Delete
router.delete("/materiais/:id", materialController.deleteMaterial)

export default router