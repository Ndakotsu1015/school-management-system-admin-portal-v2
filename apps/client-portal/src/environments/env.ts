
// export const MONITA_API_URL =
//   process.env[NodeEnvironmentParam.API_URL] ?? '/api';
export const STORE_API_URL = 'STORE_API_URL' ?? '/api';

export interface AppEnvironment {
  production: boolean;
  apiUrl: string;
}
