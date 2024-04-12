export class DuplicateError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
    }
}
//# sourceMappingURL=DuplicateError.js.map