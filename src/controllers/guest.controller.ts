import { Request, Response } from 'express';
import GuestService from '../services/GuestService';

export default class GuestController {
  private _guestService: GuestService;

  constructor() {
    this._guestService = new GuestService();
  }

  /** Create a new guest */
  public createGuest = async (req: Request, res: Response) => {
    try {
      const guest = await this._guestService.createGuest(req.body);
      return res.status(201).json(guest);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Update guest */
  public updateGuest = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await this._guestService.updateGuest(id, req.body);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Create an accompany for a guest */
  public createAccompany = async (req: Request, res: Response) => {
    try {
      const guestId = Number(req.params.guestId);
      const accompany = await this._guestService.createAccompany(guestId, req.body);
      return res.status(201).json(accompany);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Update accompany */
  public updateAccompany = async (req: Request, res: Response) => {
    try {
      const guestId = Number(req.params.guestId);
      const accompanyId = Number(req.params.id);
      const updated = await this._guestService.updateAccompany(guestId, accompanyId, req.body);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Get guest + all accompanies by tag */
  public getGuestByTag = async (req: Request, res: Response) => {
    try {
      const tag = req.params.tag;
      const guest = await this._guestService.findByTag(tag);
      return res.status(200).json(guest);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  };

  /** Get all guests with accompanies */
  public getAllGuests = async (_req: Request, res: Response) => {
    try {
      const guests = await this._guestService.findAll();
      return res.status(200).json(guests);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Update going/confirmed status for guest or accompany (deprecated) */
  public updateStatus = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { type, going, confirmed } = req.body;
      const updated = await this._guestService.updateStatus(id, type, going, confirmed);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Update "going" only if confirmed is true */
  public updateGoingStatus = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { type, going } = req.body; // type: 'guest' | 'accompany'
      const updated = await this._guestService.updateGoingStatus(id, type, going);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Delete a guest */
  public deleteGuest = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this._guestService.deleteGuest(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };

  /** Delete an accompany */
  public deleteAccompany = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this._guestService.deleteAccompany(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  };
}
