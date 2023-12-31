import { Logger } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import { IEmailSender } from "./email-sender.interface";

@provide(LocalEmailSender)
export class LocalEmailSender implements IEmailSender {
  constructor(private log: Logger) { }

  async greetingEmail(targetEmail: string): Promise<void> {
    this.log.info(`Hello ${targetEmail}`, LocalEmailSender.name);
  }

  async confirmationEmail(targetEmail: string, code: string): Promise<void> {
    this.log.info(`Confirm code for ${targetEmail} is => ${code} <= `, LocalEmailSender.name);
  }

}
