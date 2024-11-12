import { DataSource } from "typeorm";
import { Pagamento } from "../models/pagamento";
import { Perfil } from "../models/perfil";

export const DevDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "backend_copyfan",
    entities: [Pagamento,Perfil]
})

/* export const DevDataSource = new DataSource({
    type: "postgres",
    host: "dpg-cskkv0l6l47c73blb0rg-a.oregon-postgres.render.com",
    port: 5432,
    username: "unifan_pds_db_c5rf_user",
    password: "JgWEk9UdougdPc7hDz0Ntw5micDp536K",
    database: "unifan_pds_db_c5rf",
    entities: [Task],
    extra: {
        options: "-c statement_timeout=7200ms -c search_path=monsters"
    }
}) */