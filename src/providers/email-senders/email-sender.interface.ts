export interface IEmailSender {
  greetingEmail(targetEmail: string): Promise<void>;
  confirmationEmail(targetEmail: string, code: string): Promise<void>;
}
