export interface EbulkServiceRequest {
  SMS: {
    auth: {
      username: string;
      apikey: string;
    };
    message: {
      sender: string;
      messagetext: string;
      flash: string;
    };
    recipients: {
      gsm: {
        msidn: string;
        msgid: string;
      }[];
    };
    dndsender: number;
  };
}
