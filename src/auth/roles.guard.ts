import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('[RolesGuard] canActivate called, class:', context.getClass().name, 'handler:', context.getHandler().name);

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('[RolesGuard] no roles required for this route');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('[RolesGuard] request.user:', user);

    if (!user) {
      console.log('[RolesGuard] no user on request — denying access');
      return false;
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      console.log('[RolesGuard] user role not allowed:', user.role, 'required:', requiredRoles);
      throw new ForbiddenException('Insufficient role');
    }

    console.log('[RolesGuard] access granted for user role:', user.role);
    return true;
  }
}
