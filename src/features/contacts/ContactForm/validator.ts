import { z, ZodType } from "zod"
import { ContactFormData } from "./types"
 
export const ContactFormSchema: ZodType<ContactFormData> = z.object({
  name: z.string({required_error: "Name is required"}).min(2, "Name is required"),
  email: z.string().email("Invalid email address").optional(),
  age: z.number().min(1).max(120).optional(),
  phone: z.string().min(16, 'wrong phone format').max(16, 'wrong phone format').optional(),
});