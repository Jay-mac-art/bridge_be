import { Response } from "express";
import { Errors } from "../constants/errors";

export async function successResponse(
  message: string,
  result: any,
  res: Response,
) {
  res.status(200).json({
    status: "SUCCESS",
    message: message,
    result,
  });
}

export async function failureResponse(
  message: string,
  result: any,
  res: Response,
) {
  res.status(400).json({
    status: "FAILURE",
    message: message,
    result,
  });
}

export async function validationError(validationError: any, res: any) {
  // Get Validation Errors
  let meta: any = {};
  let message: any;
  let result: any;
  meta["validationErrors"] = [];
  for (let i in validationError) {
    meta["validationErrors"].push(validationError[i]["stack"]);
  }
  // Create Exception
  message = Errors.systemError.invalidRequestFormat;
  if (process.env.ENVIORNMENT != "production") result = meta;
  res.status(400).json({
    status: "FAILURE",
    message: message.message,
    customErrorNumber: message.customErrorNumber,
    result: result,
  });
}
