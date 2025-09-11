import Joi from 'joi';
import { AccompanyModel, AccompanyCreationalAttributes } from '../database/models/AccompanyModel';
import { GuestModel } from '../database/models/GuestModel';
import ErrorHandler from '../utils/handler.error';

export default class AccompanyService {
  private _errorHandler: ErrorHandler;

  constructor() {
    this._errorHandler = new ErrorHandler();
  }

  /** Validate accompany creation/update */
  private validateBody = (data: any) => {
    const schema = Joi.object({
      name: Joi.string().required().min(2),
    });

    const { error, value } = schema.validate(data);
    if (error) throw this._errorHandler.BadRequest();
    return value;
  };

  /** Create accompany for a guest */
  public createAccompany = async (guestId: number, data: AccompanyCreationalAttributes) => {
    const { name } = this.validateBody(data);

    const guest = await GuestModel.findByPk(guestId);
    if (!guest) throw this._errorHandler.NotFound();

    return await AccompanyModel.create({
      name,
      guestId,
      going: false,
      confirmed: false,
    });
  };

  /** Update accompany name */
  public updateAccompany = async (id: number, data: { name: string }) => {
    const { name } = this.validateBody(data);
    const accompany = await AccompanyModel.findByPk(id);
    if (!accompany) throw this._errorHandler.NotFound();

    accompany.name = name;
    await accompany.save();
    return accompany;
  };

  /** Delete accompany by ID */
  public deleteAccompany = async (id: number) => {
    const accompany = await AccompanyModel.findByPk(id);
    if (!accompany) throw this._errorHandler.NotFound();
    await accompany.destroy();
    return { message: 'Accompany deleted successfully' };
  };

  /** Update accompany status (going / confirmed) */
  public updateStatus = async (id: number, going: boolean, confirmed: boolean) => {
    const accompany = await AccompanyModel.findByPk(id);
    if (!accompany) throw this._errorHandler.NotFound();

    accompany.going = going;
    accompany.confirmed = confirmed;
    await accompany.save();

    return accompany;
  };

  /** Get all accompanies for a guest */
  public getAccompaniesByGuest = async (guestId: number) => {
    const guest = await GuestModel.findByPk(guestId, {
      include: [{ model: AccompanyModel, as: 'accompany' }],
    });
    if (!guest) throw this._errorHandler.NotFound();
    return guest.accompany || [];
  };
}
