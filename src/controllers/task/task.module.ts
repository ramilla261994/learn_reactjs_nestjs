import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskModel } from './task.model';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService,TaskModel],
})
export class TaskModule {}