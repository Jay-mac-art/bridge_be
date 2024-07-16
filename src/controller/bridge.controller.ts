import { Request, Response } from 'express';
import { successResponse, failureResponse, validationError } from '../common/response';
import { BridgeService } from '../services/bridge.service';
import { getTokensQuerySchema, postQuotesBodySchema, postParamsBodySchema } from '../validator/bridge.validator';

export class BridgeController {
  private bridgeService: BridgeService;

  constructor() {
    this.bridgeService = new BridgeService();
  }

  public async getTokens(req: Request, res: Response) {
    try {
      // const { error } = getTokensQuerySchema.validate(req.query);
      // if (error) {
      //   return validationError(error.details[0].message, res);
      // }

      const { chainId } = req.query;
      const result = await this.bridgeService.getSupportedTokens(Number(chainId));
      await successResponse("success", result, res);
    } catch (error) {
      await failureResponse(error.message, error, res);
    }
  }

  public async postQuotes(req: Request, res: Response) {
    try {
      // const { error } = postQuotesBodySchema.validate(req.body);
      // if (error) {
      //   return validationError(error.details[0].message, res);
      // }

      const result = await this.bridgeService.getQuote(req.body);
      await successResponse("success", result, res);
    } catch (error) {
      await failureResponse(error.message, error, res);
    }
  }

  public async postParams(req: Request, res: Response) {
    try {
      const { error } = postParamsBodySchema.validate(req.body);
      if (error) {
        return validationError(error.details[0].message, res);
      }

      const result = await this.bridgeService.getBuildTx(req.body);
      await successResponse("success", result, res);
    } catch (error) {
      await failureResponse(error.message, error, res);
    }
  }
}

export default new BridgeController();