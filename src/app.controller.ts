import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get<string>('DB_URL'));
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  handleLogin() {
    return 'This action logs a user';
  }
}
