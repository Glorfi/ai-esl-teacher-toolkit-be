export class UnauthorizedAccess extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}
//# sourceMappingURL=UnauthorizedAccess.js.map