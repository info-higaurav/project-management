import z from 'zod'

const validateTask = z.object({
    associatedProjectId: z.string().min(1, "Project ID is required"),
    taskTitle: z.string().min(1, "Task title is required"),
    taskStartDate: z.string().or(z.date()).refine(val => !!val, {
        message: "Task start date is required"
    }),
    taskDueDate: z.string().or(z.date()).refine(val => !!val, {
        message: "Task due date is required"
    }),
    taskPriority: z.enum(["medium", "urgent", "low"], {
        errorMap: () => ({ message: "Task priority must be medium, urgent, or low" })
    }),
    taskStatus: z.enum(["pending", "inprocess", "complete"], {
        errorMap: () => ({ message: "Task status must be pending, inprocess, or complete" })
    }),
    taskNotes: z.string().optional(),
    taskTags: z.array(z.string()).optional(),
    taskDescription: z.string().min(1, "Task description is required"),
    taskAssignorId: z.string().min(1, "Task assignor ID is required"),
    taskAssigneeId: z.string().min(1, "Task assignee ID is required")
})

export default validateTask;