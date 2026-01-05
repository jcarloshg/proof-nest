import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom @User() parameter decorator.
 * Extracts the 'user' property from the request (e.g., for authentication).
 * Usage: handler(@User() user)
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Assumes the request object has a 'user' property (set by an AuthGuard)
  },
);
