import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import configuration from './config/configuration';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaginatedDto } from './decorator/api.paginated.response';
import { ResponseMapDto } from './decorator/api.map.response';
import { ResponseArrayDto } from './decorator/api.array.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('/admin');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('carp-admin')
    .setDescription(
      'nest(nodejs)+mysql开发的后台管理系统 [最爱白菜吖](https://space.bilibili.com/388985971)',
    )
    .setContact('最爱白菜吖', '', '1355081829@qq.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto, ResponseMapDto, ResponseArrayDto],
  });
  SwaggerModule.setup('api', app, document);
  const port = configuration().server.port;
  await app.listen(configuration().server.port, () => {
    console.log(`api地址http://localhost:${port}/api`);
  });
}

bootstrap();
