import { BaseController, StatusCode } from "@expressots/core";
import { Post, body, controller, response } from "@expressots/adapter-express";
import { Response } from "express";
import { SendEmailConfirmationRequest, SendEmailConfirmationResponse } from "./send-email-confirmation.dto";
import { SendEmailConfirmationUseCase } from "./send-email-confirmation.usecase";

@controller("/send-email/confirmation-email")
export class SendEmailController extends BaseController {
  constructor(private sendEmail: SendEmailConfirmationUseCase) {
    super();
  }

  @Post("/")
  execute(
    @body() payload: SendEmailConfirmationRequest,
    @response() res: Response,
  ): SendEmailConfirmationResponse {
    return this.callUseCase(
      this.sendEmail.execute(payload),
      res,
      StatusCode.Accepted,
    );
  }
}
