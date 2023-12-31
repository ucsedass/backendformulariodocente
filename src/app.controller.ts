import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/nuevoformulariodocente')
  nuevoformulario(@Body() data: any) {
    return this.appService.newFormulario(data);
  }

  @Post('/buscardocente')
  buscardocente(@Body() data: any) {
    return this.appService.buscarDocente(data);
  }
}
