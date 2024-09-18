declare module 'swagger-ui-express' {
    import { RequestHandler } from 'express';
    export function setup(swaggerDoc: any, options?: any): RequestHandler;
    export const serve: RequestHandler;
}  