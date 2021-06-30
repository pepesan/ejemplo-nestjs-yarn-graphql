import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';
import { PubSub } from 'apollo-server-express';
import { LoggingPluginService } from './logging-plugin/logging-plugin.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 5000,
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp', // maneja las fechas con TS
      },
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    LoggingPluginService,
  ],
})
export class AppModule {}
