import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole();
  const requiredRole = route.data['role'] as string;

  if (userRole === requiredRole) {
    return true;
  }

  return router.createUrlTree(['/login']);
};