export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export type Logout = () => Promise<void>;