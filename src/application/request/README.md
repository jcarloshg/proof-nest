# Request Module Middleware Strategy

## Visual Context: Middleware in the NestJS Request Lifecycle

```
┌─────────────┐
│  Incoming   │
│   Request   │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Middleware  │  <─── (Our focus: runs BEFORE guards, interceptors, pipes, controllers)
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Guards    │  (Authorization, route protection)
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Interceptors│  (Transform/extend request/response, logging, etc.)
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Pipes     │  (Validation, transformation)
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Controllers │
└─────────────┘
```

- **Middleware**: Runs first, can mutate `req`, perform logging, inject IDs, etc.
- **Guards**: Authorization logic.
- **Interceptors**: Response/request transformation, logging, etc.
- **Pipes**: Validation and transformation.
- **Controllers**: Route handlers.

## File Structure

```
src/application/request/
├── request.module.ts
├── request.service.ts
├── middleware/
│   ├── correlation-id.middleware.ts
│   └── header-validation.middleware.ts
└── controller/
    └── request.controller.ts
```

## Summary
- **Class-Based Middleware:** Adds a correlation ID to each request and logs it (with DI).
- **Functional Middleware:** Validates the presence of the `x-api-key` header.
- **Module:** Applies both middlewares to the `POST /api/test` route, excluding `/health`.
- **Controller:** Demonstrates access to the correlation ID and header.
