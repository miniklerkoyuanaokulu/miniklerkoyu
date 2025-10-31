import { z } from "zod";

export const preApplicationSchema = z.object({
  childFirstName: z.string().min(2),
  childLastName: z.string().min(2),
  birthDate: z.string().min(4),
  parentFirstName: z.string().min(2),
  parentLastName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  preferredClass: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  kvkkApproved: z.literal(true, {
    errorMap: () => ({ message: "KVKK onayı zorunludur" }),
  }),
});

export type PreApplicationInput = z.infer<typeof preApplicationSchema>;


