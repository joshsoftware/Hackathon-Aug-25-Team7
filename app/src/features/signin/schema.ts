import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Enter a valid password" }),
});
