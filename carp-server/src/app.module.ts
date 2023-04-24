import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { JwtAuthGuard } from './guard/auth/jwt-auth.guard';
import { JwtStrategy } from './guard/auth/jwt.strategy';
import { DepartmentModule } from './department/department.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.register({
      global: true,
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().db.host,
      port: configuration().db.port,
      username: configuration().db.username,
      password: configuration().db.password,
      database: configuration().db.dbname,
      entities: [],
      logging: false,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AdminModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
