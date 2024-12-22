import z from 'zod'

const validateTask = z.object({
    taskTitle: z.string().min(1, "Task title is required"),
    taskDescription: z.string().min(1, "Task description is required"),
    taskStartDate: z.preprocess((date) => new Date(date as string | number | Date), z.date().refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, {
        message: "Start date cannot be in the past",
    })),
    taskDueDate: z.preprocess((date) => new Date(date as string | number | Date), z.date().refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, {
        message: "Due date cannot be in the past",
    })),
    taskPriority: z.enum(["medium", "urgent", "low"], {
        errorMap: () => ({ message: "Task priority must be medium, urgent, or low" })
    }),
    taskStatus: z.enum(["pending", "inprocess", "complete"], {
        errorMap: () => ({ message: "Task status must be pending, inprocess, or complete" })
    }),
    taskNotes: z.string().optional(),
    taskTags: z.array(z.string()).optional(),
    associatedProjectId:z.string().min(1,"Task assignee ID is required"),
    taskAssigneeId: z.string().min(1, "Task assignee ID is required")
})

export default validateTask;