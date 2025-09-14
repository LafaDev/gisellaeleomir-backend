import Joi from 'joi';
import ErrorHandler from '../utils/handler.error';
import { GuestModel, GuestCreationalAttributes } from '../database/models/GuestModel';
import { AccompanyModel, AccompanyCreationalAttributes } from '../database/models/AccompanyModel';

export default class GuestService {
  private _errorHandler: ErrorHandler;

  constructor() {
    this._errorHandler = new ErrorHandler();
  }

  /** ------------------ Validation ------------------ */
  private validateGuestBody = (data: any) => {
    const schema = Joi.object({
      name: Joi.string().required().min(2),
      tag: Joi.string().required().min(2),
    });

    const { error, value } = schema.validate(data, { stripUnknown: true });
    if (error) throw this._errorHandler.BadRequest();
    return value;
  };

  private validateAccompanyBody = (data: any) => {
    const schema = Joi.object({
      name: Joi.string().required().min(2),
    });

    const { error, value } = schema.validate(data, { stripUnknown: true });
    if (error) throw this._errorHandler.BadRequest();
    return value;
  };

  /** ------------------ Guest CRUD ------------------ */
  public createGuest = async (data: GuestCreationalAttributes) => {
    const { name, tag } = this.validateGuestBody(data);

    const existing = await GuestModel.findOne({ where: { tag } });
    if (existing) throw this._errorHandler.ConflitError();

    return await GuestModel.create({
      name,
      tag,
      going: false,
      confirmed: false, // Ensure confirmed is always set
    });
  };

  public updateGuest = async (id: number, data: Partial<GuestCreationalAttributes>) => {
    const guest = await GuestModel.findByPk(id);
    if (!guest) throw this._errorHandler.NotFound();

    const { name, tag } = this.validateGuestBody({ ...guest.toJSON(), ...data });

    if (name) guest.name = name;
    if (tag) guest.tag = tag;

    await guest.save();
    return guest;
  };

  public deleteGuest = async (id: number) => {
    const guest = await GuestModel.findByPk(id);
    if (!guest) throw this._errorHandler.NotFound();
    await guest.destroy();
    return { message: 'Guest deleted successfully' };
  };

  /** ------------------ Accompany CRUD ------------------ */
  public createAccompany = async (guestId: number, data: AccompanyCreationalAttributes) => {
    const { name } = this.validateAccompanyBody(data);

    const guest = await GuestModel.findByPk(guestId);
    if (!guest) throw this._errorHandler.NotFound();

    return await AccompanyModel.create({
      guestId,
      name,
      going: false,
      confirmed: false, // Ensure confirmed is always set
    });
  };

  public updateAccompany = async (
    guestId: number,
    accompanyId: number,
    data: Partial<AccompanyCreationalAttributes>
  ) => {
    const accompany = await AccompanyModel.findByPk(accompanyId);
    if (!accompany || accompany.guestId !== guestId) throw this._errorHandler.NotFound();

    const { name } = this.validateAccompanyBody({ ...accompany.toJSON(), ...data });

    if (name) accompany.name = name;

    await accompany.save();
    return accompany;
  };

  public deleteAccompany = async (id: number) => {
    const accompany = await AccompanyModel.findByPk(id);
    if (!accompany) throw this._errorHandler.NotFound();
    await accompany.destroy();
    return { message: 'Accompany deleted successfully' };
  };

  /** ------------------ Status Updates ------------------ */
  /** Update "going" only if confirmed is true */
  public updateGoingStatus = async (
    id: number,
    type: 'guest' | 'accompany',
    going: boolean
  ) => {
    if (type === 'guest') {
      const guest = await GuestModel.findByPk(id);
      if (!guest) throw this._errorHandler.NotFound();

      if (!guest.confirmed) {
        throw this._errorHandler.BadRequest();
      }

      guest.going = going;
      await guest.save();
      return guest;
    } else {
      const accompany = await AccompanyModel.findByPk(id);
      if (!accompany) throw this._errorHandler.NotFound();

      if (!accompany.confirmed) {
        throw this._errorHandler.BadRequest();
      }

      accompany.going = going;
      await accompany.save();
      return accompany;
    }
  };

  /** Deprecated: Do not use for frontend "going" toggle anymore */
  public updateStatus = async (
    id: number,
    type: 'guest' | 'accompany',
    going: boolean,
    confirmed: boolean
  ) => {
    if (type === 'guest') {
      const guest = await GuestModel.findByPk(id);
      if (!guest) throw this._errorHandler.NotFound();
      guest.going = going;
      guest.confirmed = confirmed;
      await guest.save();
      return guest;
    } else {
      const accompany = await AccompanyModel.findByPk(id);
      if (!accompany) throw this._errorHandler.NotFound();
      accompany.going = going;
      accompany.confirmed = confirmed;
      await accompany.save();
      return accompany;
    }
  };

  /** ------------------ Fetch Guests ------------------ */
  public findByTag = async (tag: string) => {
    const guest = await GuestModel.findOne({
      where: { tag },
      include: [{ model: AccompanyModel, as: 'accompany' }],
      order: [[{ model: AccompanyModel, as: 'accompany' }, 'id', 'ASC']],
    });

    if (!guest) throw this._errorHandler.NotFound();
    return guest;
  };

  public findAll = async () => {
    const guests = await GuestModel.findAll({
      include: [{ model: AccompanyModel, as: 'accompany' }],
      order: [
        ['id', 'ASC'],
        [{ model: AccompanyModel, as: 'accompany' }, 'id', 'ASC'],
      ],
    });

    return guests.map((g) => ({
      ...g.toJSON(),
      accompany: g.accompany ?? [],
    }));
  };
}
