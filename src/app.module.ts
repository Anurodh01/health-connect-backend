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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
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
  providers: [AppService],
})
export class AppModule {

  configure(consumer : MiddlewareConsumer){
    consumer.apply(AuthMiddleware)
    .forRoutes(
      {
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
