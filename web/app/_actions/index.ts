/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosHeaders } from "axios";
import https from "https";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Apenas para DEV!
});

api.interceptors.request.use(
  (config) => {
    config.headers = new AxiosHeaders({
      ...config.headers,
      ...mountHeader(),
    });
    return config;
  },
  (error) => Promise.reject(error)
);

const mountHeader = (headersOptions: Record<string, string> = {}) => {
  const token = localStorage.token;

  const headers = {
    ...headersOptions,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

interface Payload {
  url: string;
  content?: object | any
  message: boolean
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
      const { data } = await api.get(this.requestPayload.url);
      return data.result
    } catch (error: any) {
      console.error(error);
      if (this.requestPayload.messageError) {
        toast.error(this.requestPayload.messageError);
      } else {
        toast.error(error.response.data.error);
      }
    }
  }

  public async post(): Promise<any> {
    if (!this.requestPayload) {
      throw new Error("Payload não foi definido.");
    }
    try {
      const { data } = await api.post(this.requestPayload.url, this.requestPayload.content);
      if (this.requestPayload.message && this.requestPayload.messageSuccess) {
        toast.success(this.requestPayload.messageSuccess);
      } else if (this.requestPayload.message && !this.requestPayload.messageSuccess) {
        toast.success(data.message);
      }
      return data.result
    } catch (error: any) {
      console.error(error);
      if (this.requestPayload.messageError) {
        toast.error(this.requestPayload.messageError);
      } else {
        toast.error(error.response.data.error);
      }
    }
  }

  public async put(): Promise<any> {
    if (!this.requestPayload) {
      throw new Error("Payload não foi definido.");
    }
    try {
      const { data } = await api.put(this.requestPayload.url, this.requestPayload.content);
      if (this.requestPayload.messageSuccess) {
        toast.success(this.requestPayload.messageSuccess);
      } else if (this.requestPayload.message && !this.requestPayload.messageSuccess) {
        toast.success(data.message);
      }
      return data.result
    } catch (error: any) {
      console.error(error);
      if (this.requestPayload.messageError) {
        toast.error(this.requestPayload.messageError);
      } else {
        toast.error(error.response.data.error);
      }
    }
  }

  public async delete(): Promise<any> {
    if (!this.requestPayload) {
      throw new Error("Payload não foi definido.");
    }
    try {
      const { data } = await api.delete(this.requestPayload.url);
      if (this.requestPayload.messageSuccess) {
        toast.success(this.requestPayload.messageSuccess);
      } else {
        toast.success(data.message);
      }
      return data.result
    } catch (error: any) {
      console.error(error);
      if (this.requestPayload.messageError) {
        toast.error(this.requestPayload.messageError);
      } else {
        toast.error(error.response.data.error);
      }
    }
  }

}


