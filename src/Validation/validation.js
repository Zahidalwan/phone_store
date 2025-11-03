import { ResponseError } from "../errors/responseError.js";

export default function validate(schema, req) {
  const result = schema.safeParse(req);

  console.log(result);

  if (!result.success) {
    const message = result.error.issues[0].message;
    throw new ResponseError(400, message);
  }

  return result.data;
}

export const validate = (schema, data) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const errors = parsed.error.errors.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    const error = new Error("Validation error");
    error.status = 400;
    error.errors = errors;
    throw error;
  }
  return parsed.data;
};
