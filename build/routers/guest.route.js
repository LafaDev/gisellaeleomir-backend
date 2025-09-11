"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guest_controller_1 = __importDefault(require("../controllers/guest.controller"));
const router = (0, express_1.Router)();
const controller = new guest_controller_1.default();
router.get('/', controller.getAllGuests); // Get all guests
router.get('/:tag', controller.getGuestByTag); // Get guest by tag
router.post('/', controller.createGuest); // Create guest
router.post('/:guestId/accompany', controller.createAccompany); // Create accompany
router.patch('/:id/status', controller.updateStatus); // Update going/confirmed status
router.patch('/:id', controller.updateGuest); // <-- Update guest name/tag
router.patch('/:guestId/accompany/:id', controller.updateAccompany); // <-- Update accompany name
router.delete('/:id', controller.deleteGuest); // Delete guest
router.delete('/accompany/:id', controller.deleteAccompany); // Delete accompany
exports.default = router;
