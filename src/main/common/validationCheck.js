import createHttpError from "http-errors";

export const errorCheck = (errors, next) => {
    if (!errors.isEmpty()){
        const httpErr = createHttpError(400, "Validation Error");
        httpErr.errors = errors.array();
        next(httpErr);
    }
}