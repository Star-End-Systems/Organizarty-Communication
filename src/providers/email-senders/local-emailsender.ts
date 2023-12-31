import { Logger } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { IEmailSender } from "./email-sender.interface";

@provide(LocalEmailSender)
export class LocalEmailSender implements IEmailSender {
  constructor(private log: Logger) { }

  greetingEmail(targetEmail: string): void {
    this.log.info(`Hello ${targetEmail}`, LocalEmailSender.name);
  }

  confirmationEmail(targetEmail: string, code: string): void {
    this.log.info(`Confirm code for ${targetEmail} is => ${code} <= `, LocalEmailSender.name);
  }

}
