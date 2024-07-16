import { Application, Request, Response } from 'express';
import bridgeController from '../controller/bridge.controller';

export class BridgeRoutes {
  public route(app: Application) {
    app.get('/tokens', async (req: Request, res: Response) => {
      await bridgeController.getTokens(req, res);
    });

    app.post('/quotes', async (req: Request, res: Response) => {
      await bridgeController.postQuotes(req, res);
    });

    app.post('/params', async (req: Request, res: Response) => {
      await bridgeController.postParams(req, res);
    });
  }
}