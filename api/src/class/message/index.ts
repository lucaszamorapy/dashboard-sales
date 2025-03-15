interface IMessage {
  result: unknown;
  message: string
}

export class Message implements IMessage {
  result: unknown;
  message: string
  constructor(result: unknown, message: string) {
    this.result = result;
    this.message = message;
  }
}