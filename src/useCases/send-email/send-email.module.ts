import { CreateModule } from "@expressots/core";
import { SendEmailController } from "./send-email-confirmation/send-email-confirmation.controller";

export const SendEmailModule = CreateModule([
  SendEmailController,
]);
