export class GenerationFailed extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 406;
    }
}
//# sourceMappingURL=GenerationFailed.js.map