import { Controller, Get, Post, Delete, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

const API_KEY = '*****';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/users')
  async createUser(@Body() body, @Req() request: Request): Promise<string> {
    return await this.appService.createUser(body);
  }

  @Get('/users')
  async getUsers(@Req() request: Request): Promise<string> {
    return await this.appService.getUsers();
  }

  private checkApiKey(request: Request): void {
    if ((request.headers['x_api_key'] as string) !== API_KEY) {
      throw new Error('API KEY ERROR');
    }
  }
}
