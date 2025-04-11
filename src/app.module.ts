import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/Auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctors/doctors.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseConfig } from './config/database.config';
import { GlobalExceptionHandler } from './filters/exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DatabaseConfig]
    }),
    JwtModule.register({
      global:true
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    DoctorModule,

  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionHandler
    }],
})
export class AppModule {

  configure(consumer : MiddlewareConsumer){
    consumer.apply(AuthMiddleware)
      .exclude({
        path: '/doctor/register',
        method: RequestMethod.ALL
      }, {
        path: '/doctor/search',
        method: RequestMethod.GET
      })
    .forRoutes(
      {
        path: '/doctor/*',
        method: RequestMethod.ALL
      },{
        path : '/auth/doctor/logout',
        method : RequestMethod.ALL
      },
      {
        path : '/auth/user/logout',
        method : RequestMethod.ALL
      }
    )
  }
}
