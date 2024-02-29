export interface Message {
  message: string;
}

export interface HttpClientResponseError {
  statusText: string;
  error: {
    message: ApiError;
  };
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export const NodeEnvironmentParam = {
  API_URL: "MONITA_API_URL",
};
