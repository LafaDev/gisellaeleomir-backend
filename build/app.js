"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const login_route_1 = __importDefault(require("./routers/login.route"));
const users_route_1 = __importDefault(require("./routers/users.route"));
const guest_route_1 = __importDefault(require("./routers/guest.route"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const InitModels_1 = require("./database/models/InitModels");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        // Initialize models before routes
        (0, InitModels_1.initModels)().catch(console.error);
        this.app.get('/', (_req, res) => res.json({ ok: true }));
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // consider restricting to your frontend origin in prod
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        };
        // const accessControl: express.RequestHandler = (_req, res, next) => {
        //   res.header('Access-Control-Allow-Origin', '*');
        //   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
        //   res.header('Access-Control-Allow-Headers', '*');
        //   next();
        // };
        this.app.use(express_1.default.json());
        this.app.use(accessControl);
        this.app.use('/login', login_route_1.default);
        this.app.use('/user', users_route_1.default);
        this.app.use('/guest', guest_route_1.default);
        this.app.use(error_middleware_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => {
            console.log('-----------------------');
            console.log(`Running on port ${PORT}`);
            console.log('-----------------------');
        });
    }
}
exports.App = App;
