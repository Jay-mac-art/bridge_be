import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { BridgeRoutes } from '../routes/bridge.routes';

require('dotenv').config();

class App {
  public app: express.Application;
  public user_routes = new BridgeRoutes();

  constructor() {
    this.app = express();

    this.app.use(json());  // Middleware to parse JSON bodies
    this.app.use(urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
    this.app.use(cors());  // Middleware to enable CORS

    this.user_routes.route(this.app); // Setting up routes
  }
}

export default new App().app;
