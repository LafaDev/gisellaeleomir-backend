import { GuestModel } from './GuestModel';
import { AccompanyModel } from './AccompanyModel';

export const initModels = async () => {
  // Create associations
  GuestModel.hasMany(AccompanyModel, { foreignKey: 'guestId', as: 'accompany' });
  AccompanyModel.belongsTo(GuestModel, { foreignKey: 'guestId', as: 'guest' });

  // Sync tables
  await GuestModel.sequelize?.sync({ alter: true });
  console.log('✅ Models initialized and database synced');
};

export { GuestModel, AccompanyModel };
