import { body } from "express-validator";

export const TodoValidator = [
    body('content')
        .isString().withMessage("content should be String")
        .isLength({min: 1}).withMessage("content must be at least 1 character"),
    body('createdDate')
        .isInt().withMessage("createdDate must be Int"),
    body('isDone')
        .isBoolean().withMessage("isDone must be Boolean"),
];