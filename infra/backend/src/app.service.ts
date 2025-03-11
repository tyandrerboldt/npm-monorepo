import { Injectable } from '@nestjs/common';
import { Message } from '@repo/dtos/message';

@Injectable()
export class AppService {
  getHello(): Message {
    return { message: 'Hello World!' };
  }
}
