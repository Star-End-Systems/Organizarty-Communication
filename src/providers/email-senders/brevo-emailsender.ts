import axios from 'axios';
import { Logger } from '@expressots/core';
import * as SibApiV3Sdk from '@getbrevo/brevo';
import ENV from 'env';
import { provide } from "inversify-binding-decorators";
import { IEmailSender } from "./email-sender.interface";

@provide(BrevoEmailSender)
export class BrevoEmailSender implements IEmailSender {
  apiInstance: SibApiV3Sdk.TransactionalEmailsApi
  a2: SibApiV3Sdk.CreateContact
  API_KEY: string
  BASE_URL = "https://api.brevo.com/v3";

  constructor(private log: Logger) {
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = ENV.EmailSender.BREVO_API_KEY;

    if (!apiKey) {
      throw new Error("<BREVO_API_KEY> not found.");
    }

    this.API_KEY = apiKey;
  }

  async greetingEmail(targetEmail: string): Promise<void> {
    const htmlContent = `<h1>Hello, ${targetEmail}</h1>`;

    await this.sendEmail(targetEmail, htmlContent);
  }

  async confirmationEmail(targetEmail: string, code: string): Promise<void> {
    const htmlContent = `<p>Hello, </p>This is your code <code>${code}</code > </p>`;

    await this.sendEmail(targetEmail, htmlContent);
  }

  async sendEmail(targetEmail: string, htmlContent: string): Promise<any> {
    const url = `${this.BASE_URL}/smtp/email`;

    const html = this.baseHtml(htmlContent);

    const data = this.base_body(targetEmail, html);

    const config = this.baseConfig();

    return await axios.post(url, data, config);
  }

  baseHtml(body: string): string {
    return `<html><head></head><body>${body}</body></html>`;
  }

  base_body(targetEmail: string, htmlContent: string): any {
    return {
      sender: {
        name: "Mata Mosquieto",
        email: "matamosquieto@example.com"
      },
      to: [
        {
          email: targetEmail,
          name: targetEmail
        }
      ],
      subject: "Confirmation code",
      htmlContent: htmlContent
    }
  }

  baseConfig(): any {
    return {
      headers: {
        'Accept': 'application/json',
        'Api-Key': `${this.API_KEY}`,
        'Content-Type': 'application/json'
      }
    }

  }
}
