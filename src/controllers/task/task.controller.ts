import { Body, Controller, Delete, Get, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './taskDto/task.dto';
import { TaskModel } from './task.model';

@Controller('task')
export class TaskController {
    constructor(private _taskService: TaskService) { }

    @Get()
    async getAllTasks(): Promise<any> {
        return await this._taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() task) {
        return this._taskService.createTask(task);
    }

    @Patch()
    updateTask(@Body() task) {
        return this._taskService.updateTask(task);
    }

    @Delete()
    deleteTask(@Body('id') id) {
        return this._taskService.deleteTask(id);
    }
}
