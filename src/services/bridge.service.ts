import { Utils } from '../utility/utils';
require('dotenv').config();

export class BridgeService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.AGGREGATOR_API_URL || "https://aggregator-api.xy.finance/v1";
  }

  public async getSupportedTokens(chainId: number): Promise<any> {
    try {
      const url = `${this.apiUrl}/recommendedTokens?chainId=${chainId}`;

      const response = await Utils.externalRequest('XYFinance', 'GET', url, null, null);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getQuote(params: any): Promise<any> {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.apiUrl}/quote?${queryString}`;
      const response = await Utils.externalRequest('XYFinance', 'GET', url, null, null);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async getBuildTx(params: any): Promise<any> {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.apiUrl}/buildTx?${queryString}`;
      const response = await Utils.externalRequest('XYFinance', 'GET', url, null, null);
      return response;
    } catch (error) {
      throw error;
    }
  }
}