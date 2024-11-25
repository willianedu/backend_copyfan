import { Router } from "express"
import { PagamentoController } from "../controllers/pagamentoController"
import { PerfilController } from "../controllers/perfilController"

import { ValoresController } from "../controllers/valoresController"
import { MaterialController } from "../controllers/materialController"
import { UsuarioController} from "../controllers/usuarioController"
import { PedidoController } from "../controllers/pedidoController"

const router = Router()
const controllerPagamento = new PagamentoController()
const controllerPerfil = new PerfilController()
const controllerValores = new ValoresController()
const controllerMateriais = new MaterialController()
const controllerUsuario = new UsuarioController()
const controllerPedido = new PedidoController()


// Rota da tela principal
router.get("/", (request, response) => {
  return response.json("home page")
})


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


router.get("/pagamentos", controllerPagamento.readAllPagamento)
// Rota Read One
router.get("/pagamentos/:id", controllerPagamento.readOnePagamento)
// Rota Create
router.post("/pagamentos", controllerPagamento.createPagamento)
// Rota Update
router.put("/pagamentos/:id", controllerPagamento.updatePagamento)
// Rota Delete
router.delete("/pagamentos/:id", controllerPagamento.deletePagamento)



router.get("/valores", controllerValores.readAllValores)
// Rota Read One
router.get("/valores/:id", controllerValores.readOneValores)
// Rota Create
router.post("/valores", controllerValores.createValores)
// Rota Update
router.put("/valores/:id", controllerValores.updateValores)
// Rota Delete
router.delete("/valores/:id", controllerValores.deleteValores)

router.get("/materiais", controllerMateriais.readAllMaterial)
// Rota Read One
router.get("/materiais/:id", controllerMateriais.readOneMaterial)
// Rota Create
router.post("/materiais", controllerMateriais.createMaterial)
// Rota Update
router.put("/materiais/:id", controllerMateriais.updateMaterial)
// Rota Delete
router.delete("/materiais/:id", controllerMateriais.deleteMaterial)


// Rota Read All
router.get("/usuarios", controllerUsuario.readAllUsuario) 
// Rota Read One
router.get("/usuarios/:id",controllerUsuario.readOneUsuario)

router.post("/usuarios", controllerUsuario.createUsuario)
//
router.put("/usuarios/:id", controllerUsuario.updateUsuario)

router.delete("/usuarios/:id" , controllerUsuario.deleteUsuario)

// Rota Read All
router.get("/pedidos", controllerPedido.readAllPedido) 
// Rota Read One
router.get("/pedidos/:id",controllerPedido.readOnePedido)

router.post("/pedidos", controllerPedido.createPedido)
//
router.put("/pedidos/:id", controllerPedido.updatePedido)

router.delete("/pedidos/:id" , controllerPedido.deletePedido)


export default router