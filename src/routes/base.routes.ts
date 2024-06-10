import { router } from "../config/settings";

import { baseController } from "../controllers/base.controller";

router.get("/status", baseController);

export default router;
