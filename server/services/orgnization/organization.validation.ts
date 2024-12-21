import { z } from "zod";

export const organizationValidation = z.object({
    organizationName: z.string()
        .trim()
        .min(1, { message: "Organization name is required" })
        .min(3, { message: "Organization name must be at least 3 characters" })
        .max(50, { message: "Organization name must be at most 50 characters" })
        .regex(/^[a-zA-Z0-9\s\-_]+$/, {
            message: "Organization name can only contain letters, numbers, spaces, hyphens and underscores"
        }),
    organizationDescription: z.string()
        .trim()
        .min(1, { message: "Organization description is required" })
        .min(10, { message: "Description must be at least 10 characters" })
        .max(500, { message: "Description must be at most 500 characters" })
        .regex(/^[\w\s.,!?()-]+$/, {
            message: "Description contains invalid characters"
        }),
    createdBy: z.string()
        .min(1, { message: "Created by ID is required" })
});