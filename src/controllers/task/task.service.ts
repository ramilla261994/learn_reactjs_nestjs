import { Injectable } from '@nestjs/common';
import * as Mock_Tasks from 'src/database/task_mock.json';
import { TaskDto } from './taskDto/task.dto';
import { TaskModel } from './task.model'
import { randomUUID } from 'crypto';
import { TaskStatus } from 'src/shared/enum/task.enum';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class TaskService {

  constructor(private _task: TaskModel) { }
  task: TaskModel[] = [];

  async getAllTasks() {
    return await Object.values(Mock_Tasks);
  }

  async createTask(task: TaskModel) {
    const newTask = new TaskModel();
    newTask.id = randomUUID();
    newTask.taskName = task.taskName;
    newTask.taskType = TaskStatus.INIT;
    newTask.description = task.description;
    // newTask.createdOn = new Date().toLocaleString('en-US');
    newTask.createdOn = new Date().toDateString();
    console.log(newTask);

    // Read and parse the current tasks from the JSON file
    //  const filePath = path.resolve(__dirname, 'src/database/task_mock.json');
    const fileContent = fs.readFileSync('src/database/task_mock.json', 'utf-8');
    const mockTasks = JSON.parse(fileContent);
    mockTasks.push(newTask);


    // Resolve the path to the JSON file
    //const filePath = path.resolve(__dirname, '../database/task_mock.json');

    fs.writeFileSync('src/database/task_mock.json', JSON.stringify(mockTasks, null, 2));

    return 'Task created successfully !!';
  }

  async updateTask(task: TaskModel): Promise<string> {
    // Read and parse the current tasks from the JSON file
  
    const fileContent = fs.readFileSync('src/database/task_mock.json', 'utf-8');
    const mockTasks = JSON.parse(fileContent);

    // Find the task by its ID and update its properties
    const taskIndex = mockTasks.findIndex((t: TaskModel) => t.id === task.id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...task };

    // Write the updated mock tasks back to the JSON file
    fs.writeFileSync('src/database/task_mock.json', JSON.stringify(mockTasks, null, 2));

    return 'Task updated successfully !!';
  }

  async deleteTask(id: string): Promise<string> {
    // Read and parse the current tasks from the JSON file
    const fileContent = fs.readFileSync('src/database/task_mock.json', 'utf-8');
    const mockTasks = JSON.parse(fileContent);

    // Find the task by its ID and remove it from the list
    const taskIndex = mockTasks.findIndex((t: TaskModel) => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    mockTasks.splice(taskIndex, 1);

    // Write the updated mock tasks back to the JSON file
    fs.writeFileSync('src/database/task_mock.json', JSON.stringify(mockTasks, null, 2));

    return 'Task deleted successfully !!';
  }
}
