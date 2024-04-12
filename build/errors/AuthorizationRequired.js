export class AuthorizationRequired extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
//# sourceMappingURL=AuthorizationRequired.js.map