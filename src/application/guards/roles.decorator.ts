// Custom Roles decorator for RBAC
// Usage: @Roles('admin', 'customer', ...)
// Sets route/class metadata ("roles") for guards to later retrieve

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles'; // Key under which roles are stored in metadata
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
