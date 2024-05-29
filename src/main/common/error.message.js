export const findErrorMessage = (err) => {
    switch (err) {
        case "UNKNOWN":
            return "";
        case "VALIDATION":
            return "";
        case "NOT_FOUND":
            return "Route not found";
        case "PARS":
            return "";
        case "INTERNAL_SERVER_ERROR":
            return "Route not found";
        case "INVALID_COOKIE_SIGNATURE":
            return "Route not found";
        default:
            return "An error occurred";
    }
};

export const findErrorCode = (err) => {
    switch (err) {
        case "UNKNOWN":
            return 500;
        case "VALIDATION":
            return 412;
        case "NOT_FOUND":
            return 404;
        case "PARS":
            return 400;
        case "INTERNAL_SERVER_ERROR":
            return 500;
        case "INVALID_COOKIE_SIGNATURE":
            return 401;
        default:
            return 500;
    }
}