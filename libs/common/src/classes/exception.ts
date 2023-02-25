import { HttpException } from '@nestjs/common';
import { Throwable } from '../interfaces/error.interface';

export class Exception extends HttpException implements Throwable {
  stack?: string;

  constructor(public message: string, public statusCode: number) {
    super(message, statusCode);
  }

  public toObject() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };
  }

  public toJson() {
    return {
      name: this.name,
      message: this.message,
    };
  }

  public throw() {
    throw new Exception(this.message, this.statusCode);
  }
}
