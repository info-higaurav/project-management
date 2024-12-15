import * as z from "zod"

const loginValidationSchema = z.object({
    emailAddress: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol"),
    rememberMe: z.boolean().default(false)
  })
  
  export default loginValidationSchema;