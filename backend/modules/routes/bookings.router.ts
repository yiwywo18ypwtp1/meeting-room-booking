import { Router } from "express";

import * as bookingsController from "../controllers/bookings.controller"
import { authMiddleware } from "../../middlewares/JWTAuth";

const router = Router()

router.use(authMiddleware);

router.post("/rooms/:roomId/bookings", bookingsController.createBooking);
router.get("/rooms/:roomId/bookings", bookingsController.getBookings);
router.delete("/bookings/:id", bookingsController.deleteBooking);

export default router;