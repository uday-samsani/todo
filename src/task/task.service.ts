import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../app.datasource';
import { Task } from './task.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
    private taskRepository = AppDataSource.manager.getRepository(Task);

    getAllTasks(limit?: number, after?: Date): Promise<Task[]> {
        const query = this.taskRepository
            .createQueryBuilder('task')
            .orderBy('task.createdAt', 'DESC');
        if (after) {
            query.where('task.createdAt < :after', { after: new Date(after) });
        }
        if (limit) {
            query.limit(limit);
        }
        return query.getMany();
    }

    getTaskById(id: number): Promise<Task> {
        return this.taskRepository.findOneBy({ id: id });
    }

    getTasksList(): Promise<Task[]> {
        return this.taskRepository.find({ where: { status: false } });
    }

    addTask(payload): Promise<Task> {
        return this.taskRepository.save(payload);
    }

    updateTaskStatus(id, status): Promise<UpdateResult> {
        return this.taskRepository.update(id, { status: status });
    }

    updateTask(id: number, payload): Promise<UpdateResult> {
        return this.taskRepository.update(id, payload);
    }

    deleteTask(id: number): Promise<DeleteResult> {
        return this.taskRepository.delete(id);
    }
}
