import { z } from "zod";

export const bookZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is Required",
    }),
    author: z.string({ required_error: "Author is Required" }),
    genre: z.string({ required_error: "Genre is Required" }),
    publicationDate: z.number({
      required_error: "Publication Date is required",
    }),
  }),
});

export const bookUpdateZodValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z
      .enum([
        "Dhaka",
        "Chattogram",
        "Barishal",
        "Rajshahi",
        "Sylhet",
        "Comilla",
        "Rangpur",
        "Mymensingh",
      ])
      .optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    category: z.enum(["Dairy", "Beef", "Dual Purpose"]).optional(),
    budget: z.number().optional(),
    label: z.enum(["for sale", "sold out"]).optional(),
    seller: z.string().optional(),
  }),
});
