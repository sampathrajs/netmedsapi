import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const ValidationErrorMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(422).json({ errors: errors.array() });
        return null;
    } else next();
};
