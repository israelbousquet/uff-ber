import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { ToastService } from '../services/toast-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const localService = inject(LocalService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (!localService.hasUser) {
    router.navigate(['/auth/login']);
    toast.showToastError('Faça o login para ter acesso.')
  }
  
  return true;
};
