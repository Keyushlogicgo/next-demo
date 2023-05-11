import {
  errorResponse,
  successResponse,
  validateResponse,
} from "@helper/apiResponse";
import { getBody } from "@helper/getBody";
import userModel from "@models/user/userModel";
import { post } from "@validator/user/validateSchema";
import bcrypt from "bcrypt";

export async function GET(req) {
  try {
    const result = await userModel.find();
    return successResponse("success", result);
  } catch (error) {
    return errorResponse("error", error, "getUser");
  }
}
export async function POST(req) {
  try {
    const bodyData = await getBody(req.body);
    const validate = post(bodyData);
    if (validate) return validateResponse(validate);
    const { name, email, password } = bodyData;
    const hashPassword = await bcrypt.hash(password, 10);
    const doc = new userModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    const result = await doc.save();
    return successResponse("success", result);
  } catch (error) {
    return errorResponse("error", error, "postUser");
  }
}
