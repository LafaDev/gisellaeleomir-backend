import sequelize from './index';
import { GuestModel } from './GuestModel';
import { AccompanyModel } from './AccompanyModel';

export const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL!');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    throw err;
  }

  // Create associations
  GuestModel.hasMany(AccompanyModel, { foreignKey: 'guestId', as: 'accompany' });
  AccompanyModel.belongsTo(GuestModel, { foreignKey: 'guestId', as: 'guest' });

  // Sync tables
  await sequelize.sync({ alter: true });
  console.log('✅ Models initialized and database synced');
};

// Keep exporting models
export { GuestModel, AccompanyModel };
