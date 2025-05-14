/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import https from "https";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Apenas para DEV!
});

interface Payload {
  url: string;
  content?: object | any
  messageSuccess?: string;
  messageError?: string;
}


export class ApiRequisition {
  private requestPayload?: Payload;

  public setPayload(payload: Payload): this {
    this.requestPayload = payload;
    return this;
  }

  public async get(): Promise<any> {
    if (!this.requestPayload) {
      throw new Error("Payload não foi definido.");
    }
    try {
      const response = await api.get(this.requestPayload.url);
      return response.data
    } catch (error) {
      console.error(error);
      toast.error(this.requestPayload.messageError);
    }
  }

  public async post(): Promise<any> {
    if (!this.requestPayload) {
      throw new Error("Payload não foi definido.");
    }
    try {
      const response = await api.post(this.requestPayload.url, this.requestPayload.content);
      toast.success(this.requestPayload.messageSuccess);
      return response.data
    } catch (error) {
      console.error(error);
      toast.error(this.requestPayload.messageError);
    }
  }

  public async put(): Promise<any> {
    if (!this.requestPayload) {
      throw new Error("Payload não foi definido.");
    }
    try {
      const response = await api.put(this.requestPayload.url, this.requestPayload.content);
      toast.success(this.requestPayload.messageSuccess);
      return response.data
    } catch (error) {
      console.error(error);
      toast.error(this.requestPayload.messageError);
    }
  }

  public async delete(): Promise<any> {
    if (!this.requestPayload) {
      throw new Error("Payload não foi definido.");
    }
    try {
      const response = await api.delete(this.requestPayload.url);
      toast.success(this.requestPayload.messageSuccess);
      return response.data
    } catch (error) {
      console.error(error);
      toast.error(this.requestPayload.messageError);
    }
  }

}


