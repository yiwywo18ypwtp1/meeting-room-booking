import { Router } from "express";

import * as roomsController from "../controllers/rooms.controller"
import { authMiddleware } from "../../middlewares/JWTAuth";

const router = Router()

router.use(authMiddleware);

router.get("/", roomsController.getRooms);
router.get("/:id", roomsController.getRoom);
router.post("/", roomsController.createRoom);
router.patch("/:id", roomsController.updateRoom);
router.delete("/:id", roomsController.deleteRoom);

router.post("/:roomId/members", roomsController.addMember);

export default router;