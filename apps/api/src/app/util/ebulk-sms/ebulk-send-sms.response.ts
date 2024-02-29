export interface EbulkSendSmsResponse {
  response: EbulkSendSmsResponseData;
}

export interface EbulkSendSmsResponseData {
  status: string;
  totalSent?: number;
  cost?: number;
}
