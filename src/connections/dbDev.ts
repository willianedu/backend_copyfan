import { DataSource } from "typeorm";
import { Pagamento } from "../models/pagamento";
import { Perfil } from "../models/perfil";
import { Valores } from "../models/valores";

// export const DevDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "postgres",
//     database: "backend",
//     entities: [Task]
// })

export const DevDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "backend_copyfan",
    entities: [Pagamento,Perfil,Valores]
})