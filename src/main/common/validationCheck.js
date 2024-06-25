import expresspkg from 'express';
const { NextFunction } = expresspkg;

import createHttpError from "http-errors";
import pkg from 'express-validator';
const { Result, AlternativeValidationError, GroupedAlternativeValidationError, UnknownFieldsError, FieldValidationError } = pkg;

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