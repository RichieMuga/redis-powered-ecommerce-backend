import { serverListener, app } from "./config/settings";
import { Request, Response } from "express";

import baseRouter from "./routes/base.routes";
import productRouter from "./routes/product.routes";
import categoryRouter from "./routes/category.routes";
import cartRouter from "./routes/cart.routes";
import userRouter from "./routes/user.routes";
import {
  preloadProductsCache,
  preloadCategoriesCache,
  preloadProductsInCategoryCache,
} from "./helpers/cache/cachePreloader";

// TODO: Version individual respective routes if changes occur
app.get('/', (req: Request, res:Response) => {
  res.send('<h1>Congratulations! server is running!</h1><h2>Redis Powered Ecommerce Application API</h2><a href="https://redis-powered-ecommerce-backend-docum.netlify.app/">Documentation</a>');
});

// api routes
app.use("/", baseRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", userRouter);

// preloaded data from redis cache
preloadProductsCache();
preloadCategoriesCache();
preloadProductsInCategoryCache("electronics");


serverListener();
