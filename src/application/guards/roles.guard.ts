// RolesGuard: Checks if the authenticated user has required roles for the route
// Retrieves roles set by the @Roles(...) decorator using NestJS Reflector
// Implements CanActivate: called automatically on guarded endpoints

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from handler+class metadata (set with @Roles(...))
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log(`[RolesGuard] - requiredRoles: `, requiredRoles);
    // If no roles attached, treat as public route
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    // Extract user injected (by MockUserMiddleware or real auth)
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // No valid user/roles present?
    if (!user || !Array.isArray(user.roles)) {
      return false;
    }
    // Only pass if user has at least one required role
    return user.roles.some((role: string) => requiredRoles.includes(role));
  }
}
