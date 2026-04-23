# HTTP Client Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a generic HTTP client feature at `apps/web/src/features/http-client/` that wraps native `fetch` with typed generics, following the existing provider/repository pattern.

**Architecture:** Two-layer abstraction (provider + repository) with dependency injection. The provider wraps `fetch` with base URL, default headers, and JSON parsing. The repository delegates to the provider and is the public API for consumers.

**Tech Stack:** Native `fetch` API, TypeScript generics

**Spec:** `docs/superpowers/specs/2026-04-23-http-client-design.md`

---

### File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `apps/web/src/features/http-client/models/http-client-config-model.ts` | Config type for provider constructor |
| Create | `apps/web/src/features/http-client/interfaces/http-client-provider-interface.ts` | Provider contract |
| Create | `apps/web/src/features/http-client/interfaces/http-client-repository-interface.ts` | Repository contract |
| Create | `apps/web/src/features/http-client/providers/default-http-client-provider.ts` | Fetch wrapper implementation |
| Create | `apps/web/src/features/http-client/repositories/default-http-client-repository.ts` | Thin delegation to provider |

---

### Task 1: Create the config model

**Files:**
- Create: `apps/web/src/features/http-client/models/http-client-config-model.ts`

- [ ] **Step 1: Create the config model file**

```typescript
export type HttpClientConfigModel = {
  baseUrl: string;
  headers?: Record<string, string>;
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep http-client`
Expected: No errors related to http-client files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/http-client/models/http-client-config-model.ts
git commit -m "feat: add http client config model"
```

---

### Task 2: Create the provider interface

**Files:**
- Create: `apps/web/src/features/http-client/interfaces/http-client-provider-interface.ts`

- [ ] **Step 1: Create the provider interface file**

```typescript
export interface HttpClientProviderInterface {
  get<T>(url: string, params?: Record<string, string>): Promise<T>;
  post<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  put<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep http-client`
Expected: No errors related to http-client files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/http-client/interfaces/http-client-provider-interface.ts
git commit -m "feat: add http client provider interface"
```

---

### Task 3: Create the repository interface

**Files:**
- Create: `apps/web/src/features/http-client/interfaces/http-client-repository-interface.ts`

- [ ] **Step 1: Create the repository interface file**

```typescript
export interface HttpClientRepositoryInterface {
  get<T>(url: string, params?: Record<string, string>): Promise<T>;
  post<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  put<T>(url: string, body?: Record<string, unknown>): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep http-client`
Expected: No errors related to http-client files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/http-client/interfaces/http-client-repository-interface.ts
git commit -m "feat: add http client repository interface"
```

---

### Task 4: Implement the default provider

**Files:**
- Create: `apps/web/src/features/http-client/providers/default-http-client-provider.ts`

- [ ] **Step 1: Create the provider implementation**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep http-client`
Expected: No errors related to http-client files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/http-client/providers/default-http-client-provider.ts
git commit -m "feat: add default http client provider"
```

---

### Task 5: Implement the default repository

**Files:**
- Create: `apps/web/src/features/http-client/repositories/default-http-client-repository.ts`

- [ ] **Step 1: Create the repository implementation**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --project apps/web/tsconfig.json 2>&1 | grep http-client`
Expected: No errors related to http-client files

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/features/http-client/repositories/default-http-client-repository.ts
git commit -m "feat: add default http client repository"
```
