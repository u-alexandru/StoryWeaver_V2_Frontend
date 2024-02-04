export interface ILoginResponseData {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
    email_verified: boolean;
  }
}
