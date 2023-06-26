import {
    Get,
    Post,
    Delete,
    Put,
    Param,
    Body,
    Controller,
    ValidationPipe,
    UsePipes,
    HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

interface Response {
    data?: Task[] | Task;
    message?: string;
    error?: Error;
}

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @HttpCode(200)
    async getAllTasks(@Body() payload): Promise<Response> {
        try {
            const { limit, after } = payload;
            return { data: await this.taskService.getAllTasks(limit, after) };
        } catch (err) {
            return { message: err.message, error: err };
        }
    }

    @Get('list')
    @HttpCode(200)
    async getAllTasksList(): Promise<Response> {
        try {
            return { data: await this.taskService.getTasksList() };
        } catch (err) {
            return { message: err.message, error: err };
        }
    }

    @Get(':id')
    @HttpCode(200)
    async getTaskById(@Param('id') id: number): Promise<Response> {
        try {
            const task = await this.taskService.getTaskById(id);
            if (!task) {
                return { message: 'Task not found' };
            } else {
                return { data: task };
            }
        } catch (err) {
            return { message: err.message, error: err };
        }
    }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async addTask(@Body() payload: Task): Promise<Response> {
        try {
            return { data: await this.taskService.addTask(payload) };
        } catch (err) {
            return { message: err.message, error: err };
        }
    }

    @Put('status/:id')
    @HttpCode(200)
    async updateTaskStatus(
        @Param() id: number,
        @Body() payload: Task,
    ): Promise<Response> {
        try {
            const { status } = payload;
            const result = await this.taskService.updateTaskStatus(id, status);
            if (result.affected === 0) {
                return { message: 'task status update failed' };
            }
            return { message: 'task status update successfully' };
        } catch (err) {
            return { message: err.message, error: err };
        }
    }

    @Put(':id')
    @HttpCode(200)
    async updateTask(
        @Param('id') id: number,
        @Body() payload,
    ): Promise<Response> {
        try {
            const result = await this.taskService.updateTask(id, payload);
            if (result.affected === 0) {
                return { message: 'task update failed' };
            }
            return { message: 'task updated successfully' };
        } catch (err) {
            return { message: err.message, error: err };
        }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteTask(@Param('id') id: number): Promise<Response> {
        try {
            const result = await this.taskService.deleteTask(id);
            if (result.affected === 0) {
                return { message: 'task deletion failed' };
            }
            return { message: 'task deleted successfully' };
        } catch (err) {
            return { message: err.message, error: err };
        }
    }
}
