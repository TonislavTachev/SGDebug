class CustomError {
    constructor(message, statusCode) {
        (this.message = message), (this.statusCode = statusCode);
    }

    get ErrorMessage() {
        return this.buildErrorMessage();
    }

    buildErrorMessage() {
        return `${this.message}`;
    }
}

module.exports = { CustomError };
