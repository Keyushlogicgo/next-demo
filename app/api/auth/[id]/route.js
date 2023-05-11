import { errorResponse, successResponse, validateResponse } from "@helper/apiResponse";
import { getBody } from "@helper/getBody";
import userModel from "@models/user/userModel";
import { patch } from "@validator/user/validateSchema";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const result = await userModel.findById(id);
    return successResponse("success", result);
  } catch (error) {
    return errorResponse("error", error, "getUserDetails");
  }
}
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const result = await userModel.findByIdAndDelete(id);
    return successResponse("success", result);
  } catch (error) {
    return errorResponse("error", error, "deleteUser");
  }
}
export async function PATCH(req, { params }) {
  try {
    const bodyData = await getBody(req.body);
    const validate = patch(bodyData);
    if (validate) return validateResponse(validate);

    const { id } = params;
    const result = await userModel.findByIdAndUpdate(
      id,
      { $set: bodyData },
      { new: true }
    );
    return successResponse("success", result);
  } catch (error) {
    return errorResponse("error", error, "patchUser");
  }
}
