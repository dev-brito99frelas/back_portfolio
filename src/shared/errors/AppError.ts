class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(m: string, s = 400) {
        this.message = m;
        this.statusCode = s;
    }
}
export default AppError;
