export default function AsyncHanlder(fn: Function) {
    return async function(req: any, res: any, next: any) {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}