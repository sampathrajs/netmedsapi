import { Response } from "express";
import ErrorMessages from "./ErrorMessages";
import ErrorCodes from "./ErrorCodes";
const InternalErrorException = function(response: Response, error?: any): void {
    response
        .status(400)
        .json({ success: false, err: ErrorMessages.INTERNAL_ERROR, error, errCode: ErrorCodes.INTERNAL_ERROR });
};

export default InternalErrorException;
