import type { HttpClientProviderInterface } from '../interfaces/http-client-provider-interface';
import type { HttpClientRepositoryInterface } from '../interfaces/http-client-repository-interface';

export class DefaultHttpClientRepository implements HttpClientRepositoryInterface {
  readonly provider: HttpClientProviderInterface;

  constructor(provider: HttpClientProviderInterface) {
    this.provider = provider;
  }

  public async get<T>(url: string, params?: Record<string, string>): Promise<T> {
    return this.provider.get<T>(url, params);
  }

  public async post<T>(url: string, body?: Record<string, unknown>): Promise<T> {
    return this.provider.post<T>(url, body);
  }

  public async put<T>(url: string, body?: Record<string, unknown>): Promise<T> {
    return this.provider.put<T>(url, body);
  }

  public async delete<T>(url: string): Promise<T> {
    return this.provider.delete<T>(url);
  }
}
