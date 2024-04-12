export class NotFound extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
//# sourceMappingURL=NotFound.js.map