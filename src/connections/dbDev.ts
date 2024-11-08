import { DataSource } from "typeorm";
import { Task } from "../models/pagamento";

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
    host: "dpg-cskl08u8ii6s73ft0k30-a.oregon-postgres.render.com",
    port: 5432,
    username: "unifan_pds_tils_user",
    password: "IIEgh4gX7lUWjVWChKfjiMLXDPeBE9ov",
    database: "unifan_pds_tils",
    entities: [Task],
    extra: {
        options: "-c statement_timeout=50000ms -c search_parth=monsters",
    },
})