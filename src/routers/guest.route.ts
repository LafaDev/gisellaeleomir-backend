import { Router } from "express";
import GuestController from "../controllers/guest.controller";

const router = Router();
const guestController = new GuestController();

// Guest
router.post("/", guestController.createGuest);
router.patch("/:id", guestController.updateGuest);
router.delete("/:id", guestController.deleteGuest);

// Accompany
router.post("/:guestId/accompany", guestController.createAccompany);
router.patch("/:guestId/accompany/:id", guestController.updateAccompany);
router.delete("/accompany/:id", guestController.deleteAccompany);

// Status routes
router.patch("/:id/status", guestController.updateStatus); // Deprecated for "going" toggle
router.patch("/:id/going", guestController.updateGoingStatus); // ✅ New route

// Guest by tag
router.get("/tag/:tag", guestController.getGuestByTag);
router.get("/", guestController.getAllGuests);

export default router;
