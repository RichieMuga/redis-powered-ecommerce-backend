import { serverListener, app } from "./config/settings";

import baseRouter from "./routes/base.routes";

app.use("/api/v1", baseRouter);

serverListener();
