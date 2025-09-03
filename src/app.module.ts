import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envSchema } from './env';
import { DatabaseModule } from './shared/database/database.module';
import { SharedServicesModule } from './shared/services/shared-services.module';
import { UsersModule } from './modules/users/users.module';
import { AiModule } from './modules/ai/ai.module';
import { JourneysModule } from './modules/journeys/journeys.module';
import { MissionsModule } from './modules/missions/missions.module';
import { UserProgressModule } from './modules/user-progress/user-progress.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './shared/errors/global-exception.filter';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    SharedServicesModule,
    UsersModule,
    AiModule,
    JourneysModule,
    MissionsModule,
    UserProgressModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
