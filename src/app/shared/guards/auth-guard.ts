import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localService = inject(LocalService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (localService.hasUser) {
    router.navigate(['/lifts'])
  }
  return true;
};
