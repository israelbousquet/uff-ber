import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  showMessage(message: string, icon: 'success' | 'warning' | 'error' | 'info') {
    Swal.fire({
      icon: icon,
      title: message,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  showMessageTitle(title: string, message: string, icon: 'success' | 'warning' | 'error' | 'info', timer = false) {
    if (timer) {
      Swal.fire({
        icon: icon,
        title: title,
        text: message,
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: icon,
        title: title,
        text: message,
        showConfirmButton: true,
      });
    }
  }
}
