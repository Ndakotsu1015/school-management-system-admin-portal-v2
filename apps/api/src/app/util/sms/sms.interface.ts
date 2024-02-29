export abstract class AbstractSMSProvider {
  abstract sendSMS(phone: string, text: string): Promise<void>;
}
