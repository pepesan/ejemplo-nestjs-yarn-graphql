import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import { DateScalar } from './date.scalar';
@Module({
  providers: [TasksResolver, TasksService, DateScalar],
})
export class TasksModule {}
