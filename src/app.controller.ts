import { Controller, Get,Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    return this.appService.getHello();
  }

  @Get('/add')
  getAdd(): number{
    return this.appService.getAdd();
  }
}
