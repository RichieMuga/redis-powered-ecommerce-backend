import { serverListener, app } from "./config/settings";

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

// test api
app.use("/api/v1", baseRouter);

// preloaded data from redis cache
preloadProductsCache();
preloadCategoriesCache();
preloadProductsInCategoryCache("electronics");

app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", userRouter);

serverListener();
