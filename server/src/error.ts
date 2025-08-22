interface AppErrorConstructor {
  message?: string;
  status: number;
}

export class AppError extends Error {
  status;
  constructor({ message, status }: AppErrorConstructor) {
    super(message);

    this.status = status;
  }
}
