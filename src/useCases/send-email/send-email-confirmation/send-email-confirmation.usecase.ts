import { Report, StatusCode } from "@expressots/core";
import { BrevoEmailSender } from "@providers/email-senders/brevo-emailsender";
import { LocalEmailSender } from "@providers/email-senders/local-emailsender";
import { provide } from "inversify-binding-decorators";
import { SendEmailConfirmationRequest, SendEmailConfirmationResponse } from "./send-email-confirmation.dto";

@provide(SendEmailConfirmationUseCase)
export class SendEmailConfirmationUseCase {
  constructor(
    private emailSender: BrevoEmailSender,
    private emailSender2: LocalEmailSender,
    private report: Report,
  ) { }

  execute(payload: SendEmailConfirmationRequest): SendEmailConfirmationResponse | null {
    try {
      this.assertValidRequest(payload);

      this.emailSender.confirmationEmail(payload.email, payload.code);

      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  assertValidRequest(payload: SendEmailConfirmationRequest) {
    if (!payload.email) {
      const error = this.report.error(
        "Email cannot be null",
        StatusCode.BadRequest,
        "send-email-confirmation.usecase",
      );

      throw error;
    }

    if (!payload.code) {
      const error = this.report.error(
        "Code cannot be null",
        StatusCode.BadRequest,
        "send-email-confirmation.usecase",
      );

      throw error;
    }
  }
}
