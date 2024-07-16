import axios from 'axios';
import { Errors , RefStrings } from '../constants';
export class Utils {
  public static async externalRequest(
    provider: string,
    type: string,
    url: any,
    body: any,
    headers: any,
  ) {
    // Reference
    let response: any;
    const throwException = false;
    try {
      // Request
      if (type == RefStrings.meta.requestType.post) {
        response = await axios.post(url, body, {
          headers,
        });
      } else if (type == RefStrings.meta.requestType.get) {
        response = await axios.get(url, {
          headers,
        });
      } else if (type == RefStrings.meta.requestType.put) {
        response = await axios.put(url, body, {
          headers,
        });
      } else {
        throw Errors.systemError.invalidRequest;
      }
      // console.log("🚀 ~ file: utils.ts:32 ~ Utils ~ response", response)
      response = response.data;
      console.log(
        '🚀 ~ file: utils.ts ~ line 204 ~ utils ~ externalRequest ~ response',
        response,
      );
      //Add LogDetails
      return response;
    } catch (error: any) {
      // Log Error
      console.log(provider + ' | Error : ');
      console.log(error.code);
      console.log(error.response);
      // Throw Exception
      if (error?.response?.data) {
        throw error.response.data;
      }
      //Add LogDetails
      if (throwException) {
        throw Errors.systemError.externalProviderIssue;
      } else {
        // Return error
        return error;
      }
    }
  }
}


