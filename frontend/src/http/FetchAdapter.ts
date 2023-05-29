import HttpClient from "./HttpClient";

export default class FetchAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
  }
  async post(url: string, data: any): Promise<any> {
    const options = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return await (await fetch(url, options)).json();
  }
}
