import express from "express";
import {} from "../handlers/usersHandler.js";
import {
  addProductHandler,
  deleteProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../handlers/productsHandler.js";

const productRouter = express.Router();

productRouter.get("/product", getAllProductHandler);
productRouter.get("/product/:id", getProductByIdHandler);
productRouter.post("/product", addProductHandler);
productRouter.put("/product/:id", updateProductHandler);
productRouter.delete("/product/:id", deleteProductHandler);

export default productRouter;
