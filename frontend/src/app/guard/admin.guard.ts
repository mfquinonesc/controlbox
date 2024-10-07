import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  authService.getIsLogin().subscribe({
    next:(value)=> {
      if(!value){
        const router = inject(Router);
        router.navigateByUrl('/unauthorized');
      }           
    },
  });
  return authService.isAuthenticated();
};
