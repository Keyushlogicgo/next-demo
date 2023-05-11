import mongoose from "mongoose";
import { NextResponse } from "next/server";
const res = NextResponse;
export const successResponse = (message, data, count) => {
  return res.json({ message: message, data: data, count: count });
};
export const errorResponse = (message, err, funName) => {
  console.log(`[ERROR] ${funName} : ${err.message}`);

  var errMsg;
  if (err instanceof mongoose.Error.CastError) {
    errMsg = "Invalid ID provided";
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    const filedName = Object.keys(err.keyValue)[0];
    errMsg = `${filedName} Already exist`;
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    errMsg = "Document not found"; // Custom error message for DocumentNotFoundError
  } else if (err instanceof mongoose.Error.ValidationError) {
    errMsg = "Validation failed"; // Custom error message for ValidationError
  } else {
    errMsg = "Internal server error"; // Re-throw the original error if it's not one of the above types
  }
  return res.json({ message: message, error: errMsg });
};
export const validateResponse = (error) => {
  var arrOjb = { message: "error" };
  error.details.map((item) => {
    const { path, message } = item;
    arrOjb = { ...arrOjb, [path]: message.replace(/['"]/g, "") };
  });

  return res.json(arrOjb);
};
