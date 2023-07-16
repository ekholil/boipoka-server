import { z } from "zod";

export const userZodValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is Required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});
export const userLoginZodValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is Required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
