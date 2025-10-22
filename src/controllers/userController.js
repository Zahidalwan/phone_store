import * as userService from "../services/userService.js";

export const getUsersHandler = async (req, res, next) => {
  try {
    const res = await userService.getAllUser();

    res.status(200).json({
      status: "success",
      data: res,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler = async (req, res, next) => {
  try {
    const res = await userService.getUserById(req.params.id);

    res.status(200).json({
      status: "success",
      data: res,
    });
  } catch (error) {
    next(error);
  }
};
