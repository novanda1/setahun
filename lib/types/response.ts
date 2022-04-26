export type Status = "ok" | "error";

export class ResponseValue {
  constructor(status: Status, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  status: Status;
  message: string;
  data?: any;
}
