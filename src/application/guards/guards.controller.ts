// GuardsController: Demonstrates RBAC with two endpoints - one protected, one open
// - GET /public: Accessible by anyone (no decorator, no guard)
// - GET /admin:  Protected by RolesGuard; requires user to have the 'admin' role
// Apply @Roles('admin') & @UseGuards(RolesGuard) to illustrate decorator+guard interaction.

import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller()
export class GuardsController {
  // /admin is protected: only 'admin' role users succeed
  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles('admin')
  getAdmin() {
    return { message: 'Hello Admin! You have access.' };
  }

  // /public is open to everyone (no guard, no roles)
  @Get('public')
  getPublic() {
    return { message: 'Hello Public! Anyone can access.' };
  }
}
