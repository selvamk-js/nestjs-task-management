import { Injectable, NotFoundException } from '@nestjs/common';
import { remove } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-staus.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepositoy: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepositoy.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const taskFound = await this.taskRepositoy.findOne(id);
    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return taskFound;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepositoy.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepositoy.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const taskFound = await this.getTaskById(id);
    taskFound.status = status;
    await taskFound.save();

    return taskFound;
  }
}
