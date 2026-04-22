import type { SanityClient, SanityRepository } from '../types/index.js';

export abstract class BaseRepository implements SanityRepository {
  readonly client: SanityClient;

  constructor(client: SanityClient) {
    this.client = client;
  }

  protected async query<T>(groq: string, params?: Record<string, unknown>): Promise<T> {
    return this.client.fetch<T>(groq, params);
  }
}
