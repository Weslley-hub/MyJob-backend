declare module 'swagger-autogen' {
    const swaggerAutogen: () => (outputFile: string, endpointsFiles: string[], doc?: any) => Promise<void>;
    export default swaggerAutogen;
}