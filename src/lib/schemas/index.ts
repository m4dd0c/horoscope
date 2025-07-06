import { z } from "zod";

const SignupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dob: z
    .date({
      required_error: "A date of birth is required.",
    })
    .refine((date) => {
      const today = new Date();
      return date < today;
    }, "Date of birth must be in the past"),
});

const SigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export { SignupSchema, SigninSchema };
