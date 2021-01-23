import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-staus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatusses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  private isStatusValid(status: any) {
    return this.allowedStatusses.includes(status);
  }

  transform(value: string) {
    const valueUC = value.toUpperCase();
    if (!this.isStatusValid(valueUC)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return value;
  }
}
