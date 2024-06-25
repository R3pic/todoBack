import createHttpError from "http-errors";
import { Result, AlternativeValidationError, GroupedAlternativeValidationError, UnknownFieldsError, FieldValidationError } from 'express-validator';

/**
 *
 * @param {Result<AlternativeValidationError | GroupedAlternativeValidationError | UnknownFieldsError | FieldValidationError>} errors
 * @param {NextFunction} next
 */
export const errorCheck = (errors, next) => {
    if (!errors.isEmpty()){
        const httpErr = createHttpError(400, "Validation Error");
        httpErr.errors = errors.array();
        next(httpErr);
    }
}