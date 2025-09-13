import express from 'express';
import 'express-async-errors';
import loginRouter from './routers/login.route';
import userRouter from './routers/users.route';
import guestRouter from './routers/guest.route';
import errorMiddleware from './middleware/error.middleware';
import { initModels } from './database/models/InitModels';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Initialize models before routes
    initModels().catch(console.error);

    this.app.get('/', (_req, res) => res.json({ deployWorked: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // consider restricting to your frontend origin in prod
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/login', loginRouter);
    this.app.use('/user', userRouter);
    this.app.use('/guest', guestRouter);

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log('-----------------------');
      console.log(`Running on port ${PORT}`);
      console.log('-----------------------');
    });
  }
}

export { App };
