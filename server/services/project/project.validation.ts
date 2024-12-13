import z from "zod";

export const projectValidation = z.object({
    projectName:z.string()
    .min(2, {message:"Project name must be at least 2 characters."})
    .max(20, {message:"Project name must be at most 50 characters."})
    .min(1, {message: "Project name is required"}),
    projectStartDate:z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format"
    })
    .min(1, {message: "Start date is required"}),
    projectEndDate:z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format"
    })
    .min(1, {message: "End date is required"}),
    projectDescription:z.string()
    .min(10, {message:"Project description must be at least 10 characters."})
    .min(1, {message: "Project description is required"}),
    projectManagerId:z.string()
    .min(1, {message: "Project manager is required"})
})

export type CreateProjectType = z.infer<typeof projectValidation>;