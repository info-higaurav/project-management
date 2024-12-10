import { z } from 'zod'

export const signupSchema = z.object({
    emailAddress: z.string()
        .email("Please enter a valid email address")
        .min(1, "Email address is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter") 
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userRole: z.enum(["user", "manager", "admin", "developer", "designer", "tester", "product_owner", "scrum_master"]).optional(),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
    address: z.object({
        street: z.string().optional(),
        city: z.string().optional(), 
        state: z.string().optional(),
        pinCode: z.string().optional(),
        country: z.string().optional()
    }).optional(),
    profilePicture: z.string().optional()
})

export const loginValidation = z.object({
    emailAddress: signupSchema.shape.emailAddress, // Reusing email validation from signupSchema
    password: signupSchema.shape.password, // Reusing password validation from signupSchema
});

export type SignupInput = z.infer<typeof signupSchema>
