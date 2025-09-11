import { Router } from 'express';
import GuestController from '../controllers/guest.controller';

const router = Router();
const controller = new GuestController();

router.get('/', controller.getAllGuests); // Get all guests
router.get('/:tag', controller.getGuestByTag); // Get guest by tag

router.post('/', controller.createGuest); // Create guest
router.post('/:guestId/accompany', controller.createAccompany); // Create accompany

router.patch('/:id/status', controller.updateStatus); // Update going/confirmed status
router.patch('/:id', controller.updateGuest); // <-- Update guest name/tag
router.patch('/:guestId/accompany/:id', controller.updateAccompany); // <-- Update accompany name

router.delete('/:id', controller.deleteGuest); // Delete guest
router.delete('/accompany/:id', controller.deleteAccompany); // Delete accompany

export default router;
