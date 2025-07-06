export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  dob: Date;
  isVerified: boolean;
  verificationToken: {
    token?: string;
    expires?: Date;
  };
}
export interface ICookieOptions {
  expires?: Date;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
  secure?: boolean; // true for HTTPS, false for HTTP. Set to true in production.
}
