import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';

export class BasicHttpService {

  private static spHttpClient: SPHttpClient;

  public static init(spHttpClient: SPHttpClient) { this.spHttpClient = spHttpClient; }

  public static async get(url: string): Promise<any> {
    const response: SPHttpClientResponse = await this.spHttpClient.get(url, SPHttpClient.configurations.v1);
    return await response.json();
  }

}
