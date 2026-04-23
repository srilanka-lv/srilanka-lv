# HTTP Client Feature Design

## Overview

A generic HTTP client feature at `apps/web/src/features/http-client/` that wraps the native `fetch` API with typed generics. Follows the same provider/repository pattern as the existing Sanity feature. Designed to be consumed by API-specific features (e.g. Amadeus).

## File Structure

```
apps/web/src/features/http-client/
├─��� interfaces/
│   ├── http-client-provider-interface.ts
│   └── http-client-repository-interface.ts
├── models/
│   └── http-client-config-model.ts
├── providers/
│   └── default-http-client-provider.ts
├── repositories/
│   └── default-http-client-repository.ts
```

## Interfaces

### HttpClientProviderInterface

```typescript
export interface HttpClientProviderInterface {
  get<T>(url: string, params?: Record<string, string>): Promise<T>;
  post<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  put<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
```

### HttpClientRepositoryInterface

```typescript
export interface HttpClientRepositoryInterface {
  get<T>(url: string, params?: Record<string, string>): Promise<T>;
  post<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  put<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
```

Both layers expose the same method signatures. The repository delegates to the provider. Consumers depend on the repository interface.

## Models

### HttpClientConfigModel

```typescript
export type HttpClientConfigModel = {
  baseUrl: string;
  headers?: Record<string, string>;
};
```

Passed to the provider constructor. No response model needed — methods return parsed JSON typed as `T` directly.

## Implementations

### DefaultHttpClientProvider

- Takes `HttpClientConfigModel` in the constructor
- Stores `baseUrl` and `headers` as private readonly fields
- `get<T>`: appends query params via `URLSearchParams` to the URL
- `post<T>` and `put<T>`: send JSON body with `Content-Type: application/json`
- `delete<T>`: sends DELETE request with no body
- All methods call `fetch`, check `response.ok`, throw an `Error` with status code and status text on failure, and return `response.json()` typed as `T`

### DefaultHttpClientRepository

- Takes `HttpClientProviderInterface` in the constructor (dependency injection)
- Stores it as a readonly property
- Each method delegates directly to the corresponding provider method

## Design Decisions

- **No auth handling**: Authentication is the consuming feature's responsibility (e.g. an Amadeus provider manages its own OAuth2 token lifecycle and injects headers).
- **No retry/interceptor logic**: YAGNI. Can be added later if needed.
- **No custom error classes**: The provider throws a plain `Error` on non-ok responses. Consuming features can catch and handle as needed.
- **No response wrapper model**: Methods return `T` directly. Status codes and headers are not exposed — if the request fails, it throws.
- **Generic type per call site**: Callers pass the expected response type as a generic: `get<FlightResponse>('/flights', params)`.
- **Native fetch**: No external HTTP library dependencies.

## Usage Example

```typescript
import { DefaultHttpClientProvider } from '@/features/http-client/providers/default-http-client-provider';
import { DefaultHttpClientRepository } from '@/features/http-client/repositories/default-http-client-repository';

const provider = new DefaultHttpClientProvider({
  baseUrl: 'https://api.example.com',
  headers: { Authorization: 'Bearer token' },
});

const repository = new DefaultHttpClientRepository(provider);

type FlightResponse = { flights: Array<{ id: string; price: number }> };

const data = await repository.get<FlightResponse>('/flights', { origin: 'CMB', destination: 'AMS' });
```
