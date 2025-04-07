import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Welcome to health connect version 0.0.1</h1>';
  }
}
