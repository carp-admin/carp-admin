import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './api/admin/admin.module';
import { CompanyModule } from './api/company/company.module';
import { RoleModule } from './api/role/role.module';
import { PermissionModule } from './api/permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
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
      synchronize: true,
      autoLoadEntities: true,
    }),
    AdminModule,
    CompanyModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
