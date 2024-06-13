import { Router } from "express";

import { baseController } from "../controllers/base.controller";

const router = Router()

router.get("/api/v1/status", baseController);

export default router;
