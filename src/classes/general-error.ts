export class GeneralError {
  error: Error;
  code: number;
  message: string;

  constructor(error: Error, message: string, code: number) {
    this.error = error;
    this.message = message;
    this.code = code;
  }

  buildResponse() {
    const { error, message } = this;

    return {
      message,
      error: true,
      errorMessage: error.message
    };
  }
}
