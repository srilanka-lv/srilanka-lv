import type { HttpClientProviderInterface } from '../interfaces/http-client-provider-interface';
import type { HttpClientConfigModel } from '../models/http-client-config-model';

export class DefaultHttpClientProvider implements HttpClientProviderInterface {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(config: HttpClientConfigModel) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers ?? {};
  }

  public async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';

    const response = await fetch(`${this.baseUrl}${url}${query}`, {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  public async post<T>(url: string, body?: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  public async put<T>(url: string, body?: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}
