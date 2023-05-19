import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';

interface ApiResponse<T> {
  status: number;
  data: T;
}

interface IRequestOptions {
  headers?: Record<string, string>;
}

@injectable()
abstract class BaseApi {
  protected axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    // this.axiosInstance.interceptors.response.use(this.handleResponse, this.handleResponseError);
  }

  // protected handleResponse(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
  //   return response;
  // }

  // protected handleResponseError(error: any) {
  //   // Handle response errors here
  //   return Promise.reject(error);
  // }

  protected async request<T>(options: AxiosRequestConfig<IRequestOptions>): Promise<T> {
    const response = await this.axiosInstance.request<T>(options);
    return response.data;
  }

  protected async get<T>(url: string): Promise<any> {
    const response = await this.axiosInstance.request<ApiResponse<T>>({
      method: 'GET',
      url,
    });

    return response.data;
  }

  protected async post<T>(url: string, data: T, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.request<ApiResponse<T>>({
      method: 'POST',
      url,
      data,
      ...config,
    });

    return response.data;
  }

  protected async put<T>(url: string, data: T, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.request<ApiResponse<T>>({
      method: 'PUT',
      url,
      data,
      ...config,
    });

    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<void> {
    await this.axiosInstance.request<ApiResponse<T>>({
      method: 'DELETE',
      url,
      ...config,
    });
  }
}

export default BaseApi;
