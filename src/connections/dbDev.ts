import { DataSource } from "typeorm";
import { Pagamento } from "../models/pagamento";
import { Perfil } from "../models/perfil";

import { Valores } from "../models/valores";

import {Material} from "../models/material"
import { Usuario } from "../models/usuario";
import { Pedido } from "../models/pedido";


export const DevDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "backend_copyfan",

    entities: [Pagamento,Perfil,Valores,Material,Usuario, Pedido]
})


