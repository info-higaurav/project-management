import z from "zod";

export const projectValidation = z.object({
    projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
    projectStartDate: z.string().refine((dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return false;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date.getTime() >= today.getTime();
    }, {
        message: "Start date cannot be in the past",
    }),
    projectEndDate: z.string().refine((dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return false;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date.getTime() >= today.getTime();
    }, {
        message: "End date cannot be in the past",
    }),
    projectDescription: z.string().min(10, { message: "Project description must be at least 10 characters." }),
    projectManagerId: z.string(),
    projectOrgnizationId: z.string(),
}).refine((data) => {
    const startDate = new Date(data.projectStartDate);
    const endDate = new Date(data.projectEndDate);
    return endDate.getTime() >= startDate.getTime();
}, {
    message: "End date must be same as or after start date",
    path: ["projectEndDate"],
});

export type CreateProjectType = z.infer<typeof projectValidation>;