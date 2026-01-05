# Proof NestJS Backend

---

## Project Overview

**Tech Stack:**

- **Framework:** [NestJS](https://nestjs.com/) (v11)
- **Language:** TypeScript 5.x
- **Build Tools:** Nest CLI, Prettier, ESLint, Jest

**Purpose:**  
This is a modular, extensible backend API server built with NestJS. Its core is designed for best practices in error handling, validation, modularity, and ease of integration. Out-of-the-box API modules demo authentication, request lifecycle techniques, custom validation/example pipes, global exception filtering, and more.

---

## Architecture

**Pattern:**

> Standard NestJS Modular, with DDD/Hexagonal influences  
> Every business concern is encapsulated as a module, with clear boundaries and dependency injection. Modules expose controllers for routing, services/providers for logic, and (optionally) custom pipes, guards, and decorators.

---

## Configuration & Setup

### Scripts (`package.json`)

| Script        | Description                      |
| ------------- | -------------------------------- |
| `start`       | Run the NestJS app               |
| `start:dev`   | Run app in dev mode (watch)      |
| `start:debug` | Debug mode with watch            |
| `start:prod`  | Run JS from build output         |
| `build`       | Compile TypeScript to JavaScript |
| `format`      | Format code with Prettier        |
| `lint`        | Lint and auto-fix                |
| `test`        | Run all unit tests               |
| `test:watch`  | Test runner in watch mode        |
| `test:cov`    | Collect test coverage            |
| `test:debug`  | Debug tests                      |
| `test:e2e`    | Run end-to-end tests             |

### Environment Variables

- **No `.env` found**; no required environment variables unless additional configuration is supplied.
- All configuration (keys, endpoints, etc.) are hardcoded or handled inside modules.

---

## Modules

---

### 1. `auth` — Authentication Module

**Purpose:**  
Handles user registration and login (in-memory for demonstration).

**Key Components:**

- **Controller:** `AuthController`
- **Service:** `AuthService`

**Endpoints:**  
| Method | Route | Purpose |
|--------|----------------|---------------|
| POST | `/auth/sign-up`| Register user |
| POST | `/auth/login` | Login user |

**Dependencies:**

- No external modules used.
- Maintains its own user state in-memory.

---

### 2. `discovery` — Decorator & Lifecycle Reference

**Purpose:**  
Comprehensive showcase of essential NestJS decorators, request lifecycle, DI, and custom extensions.

**Key Components:**

- **Controller:** `DiscoveryController`
- **Service:** `DiscoveryService`
- **Custom Decorator:** `User` (`decorators/user.decorator.ts`)

**Endpoints:**
| Method | Route | Description |
|--------|--------------------------|----------------------------------------------------------------------------|
| GET | `/discovery/status` | Service status; DI basics demo |
| POST | `/discovery/data` | Shows `@Body`, `@Headers`, `@Ip`, `@HttpCode`, `@Header` |
| GET | `/discovery/test-params/:id` | Path and query param demo |
| GET | `/discovery/guarded` | Runs a demo guard & shows usage of custom `@User()` decorator |
| GET | `/discovery/intercepted` | Runs a demo interceptor on the route |
| POST | `/discovery/validate` | Shows custom/inline pipe transformation |

**Dependencies:**

- None, but serves as a reference for advanced usage (custom guard/interceptor/pipe inside file).

---

### 3. `notification` — Notification Service Module

**Purpose:**  
Handles multi-channel notifications (Email, SMS, Logger).

**Key Components:**

- **Controller:** `NotificationController`
- **Services:** `NotificationService`, `EmailNotificationService`, `SmsNotificationService`, `LoggerService`
- **Providers:** Notification config, DTOs

**Endpoints (inferred):**

- Expected: send notification via various channels.

**Dependencies:**

- May use providers/configs for channel selection.
- Possibly imports shared config providers.

---

### 4. `filters` — Global Exception Handling

**Purpose:**  
Implements centralized error formatting via a global HTTP error filter (using `APP_FILTER` token).

**Key Components:**

- **Controller:** `FiltersController`
- **Provider:** `HttpExceptionFilter`
- **Module:** `ExceptionsModule`

**Endpoints:**  
| Method | Route | Purpose |
|--------|-------------------|----------------|
| GET | `/filters/error` | Forces error for filter demo |

**Dependencies:**

- Registered via `APP_FILTER` (supports DI in error filter).

---

### 5. `pipes-example` — Custom Validation & Transformation

**Purpose:**  
Demonstrates DTO-based validation and a custom `PipeTransform` for file sizes.

**Key Components:**

- **Controller:** `PipesExampleController`
- **Pipe:** `FileSizePipe`
- **DTO:** `CreateUserDto`
- **Module:** `PipesExampleModule`

**Endpoints:**  
| Method | Route | Description |
|--------|-----------------------------|-----------------------|
| POST | `/pipes-example/create` | Validates request body|
| GET | `/pipes-example/file-size` | Pipe validates query |

**Dependencies:**

- Uses `class-validator` for DTO validation.

---

### 6. `interceptors` — Response/Timeout Interceptors

**Purpose:**  
Showcases custom response transformation and timeout logic.

**Key Components:**

- **Controller:** `DemoController`
- **Interceptors:** `TimeoutInterceptor`, `TransformInterceptor`
- **Module:** `InterceptorsModule`

**Endpoints:**

- Refer to controller for endpoints that demonstrate interceptors.

---

### 7. `guards` — Role-Based Access Control

**Purpose:**  
Implements `@Roles()` decorator, guards, and role-based access to endpoints.

**Key Components:**

- **Controller:** `GuardsController`
- **Guards:** `RolesGuard`
- **Decorators:** `Roles`
- **Middlewares:** `MockUserMiddleware`
- **Module:** `AccessControlModule`

**Endpoints:**

- See controller for endpoints requiring certain roles.

---

### 8. `request` — Request Context & Middleware

**Purpose:**  
Demonstrates custom request-level logic, middleware usage for headers and correlation IDs.

**Key Components:**

- **Controller:** `RequestController`
- **Middlewares:** `HeaderValidationMiddleware`, `CorrelationIdMiddleware`
- **Service:** `RequestService`
- **Module:** `RequestModule`

**Endpoints:**

- Demonstrates custom context and/or header logic.

---

### 9. `sample` & `use-sample` — Dynamic Module/Options Pattern

**Purpose:**  
Shows off NestJS dynamic module pattern, passing options/config during import.

**Key Components:**

- **Service:** `SampleService`, `UseSampleService`
- **Module:** `SampleModule`, `UseSampleModule`
- **Interface:** `SampleModuleOptions`

**Endpoints:**

- Varies per demo.

---

## Dependency/Module Diagram

```
AppModule
 ├── AuthModule
 ├── DiscoveryModule
 ├── NotificationModule
 ├── Filters (ExceptionsModule)
 ├── PipesExampleModule
 ├── InterceptorsModule
 ├── Guards (AccessControlModule)
 ├── RequestModule
 ├── SampleModule (dynamic)
 └── UseSampleModule
```

_All feature modules self-register and expose clean boundaries, following standard NestJS modularity._

---

## References

- [NestJS Core Docs](https://docs.nestjs.com/)
- For advanced decorators, guards, pipes: see `/src/application/discovery/`
- **Testing:** See `/DOCS/test/{module}/` for .http test scripts for all main modules.

---
