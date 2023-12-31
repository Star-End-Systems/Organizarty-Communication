export interface IEmailSender {
  greetingEmail(targetEmail: string): void;
  confirmationEmail(targetEmail: string, code: string): void;
}
