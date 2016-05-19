declare module 'express-serve-static-core' {
    interface IRouter<T> extends RequestHandler {
        use(err: Error, path: string, router: Router): T;
    }
}