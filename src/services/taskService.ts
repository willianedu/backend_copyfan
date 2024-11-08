import { DevDataSource } from "../connections/dbDev";
import { Task } from "../models/pagamento";

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação. Essas consultas são feitas na tabela do Repository que está na conexão do DataSource.

const cursor = DevDataSource.getRepository(Task)

// 2) Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá do FRONTEND

type newTaskRequest = {
    description: string,
    date_task: Date
}

type findTaskRequest = {
    id: string
}

type updateTaskRequest = {
    id: string,
    status: boolean
}

export class TaskService {
    async createTask({ description, date_task } : newTaskRequest) : Promise<Task | Error> {
        try {
            // INSERT INTO tasks VALUES(description, date_task)
            const task = cursor.create({
                description, date_task
            })
            // A função cursor.save() executa a instrução INSERT na tabela
            await cursor.save(task)
            return task
        }
        catch(err){
            return new Error("Unexpected error saving task!")
        }
    }
    
    async readOneTask({ id } : findTaskRequest) : Promise<Task | Error> {
        try {
            // SELECT * FROM tasks WHERE id = id LIMIT 1
            const task = await cursor.findOne({ where: {id}})
            if(!task) {
                return new Error("Task not found!")
            }
            return task
        }
        catch(err) {
            return new Error("Unexpected error reading task!")
        }
        
    }
    
    async readAllTask(): Promise<Task[] | Error> {
        try {
            // SELECT * FROM tasks
            const tasks = await cursor.find()
            return tasks
        } 
        catch(err){
            return new Error("Unexpected error reading tasks!")
        }
    }
    
    async updateTask({ id, status } : updateTaskRequest): Promise<Task | Error> {
        try {
            // SELECT * FROM tasks WHERE id = id LIMIT 1
            const task = await cursor.findOne({ where: {id}})
            if(!task) {
                return new Error("Task not found!")
            }
            // Se houver uma nova descrição e/ou data informados pelo usuário vindos da requisição, a tarefa será atualizada com os novos dados; senão, os dados antigos serão mantidos.
            task.status = status
            // UPDATE tasks WHERE id = id SET description = description, date_task = date_task
            await cursor.save(task)
            return task
        } 
        catch(err){
            return new Error("Unexpected error updating task!")
        }

        // let x = 10

        // // SE..ENTÃO..SENÃO
        // if (x % 2 == 0) {
        //     console.log("par")
        // }
        // else {
        //     console.log("ímpar")
        // }

        // // OPERADOR TERNÁRIO
        // (x % 2 == 0) ? console.log("par") : console.log("ímpar")

        
    }
    
    async deleteTask({ id }:findTaskRequest): Promise<String | Error> { 
        try{
            // SELECT * FROM tasks WHERE id = id LIMIT 1
            const task = await cursor.findOne({ where: {id}})
            if(!task) {
                return new Error("Task not found!")
            }
            await cursor.delete(task.id)
            return "Task removed successfully!"
        }
        catch(err){
            return new Error("Unexpected error deleting task!")
        }
    }
}