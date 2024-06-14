import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: HotToastService) {}

  showToastSucess(message: string) {
    this.toast.success(message, {
      position: 'top-center',
      duration: 2000,
      style: {
        border: 'none',
        borderRadius: '10px',
        padding: '16px 24px',
        color: 'var(--primary-color)',
        backgroundColor: 'var(--blue-primary-color-dark)',
        boxShadow: '10px 10px 21px -12px rgba(0,0,0,0.6)',
      },
      iconTheme: {
        primary: 'rgb(66, 233, 16)',
        secondary: '#FFFAEE',
      },
    });
  }

  showToastError(message: string) {
    this.toast.error(message, {
      position: 'top-center',
      duration: 2000,
      style: {
        border: 'none',
        borderRadius: '10px',
        padding: '16px 24px',
        color: 'var(--primary-color)',
        backgroundColor: 'var(--blue-primary-color-dark)',
        boxShadow: '10px 10px 21px -12px rgba(0,0,0,0.6)',
      },
      iconTheme: {
        primary: 'rgb(252, 77, 77)',
        secondary: '#FFFAEE',
      },
    });
  }

  showWelcome(message: string) {
    this.toast.show(message, {
      duration: 2000,
      position: 'top-center',
      icon: '😎',
      style: {
        border: 'none',
        borderRadius: '10px',
        padding: '16px 24px',
        color: 'var(--primary-color)',
        backgroundColor: 'var(--blue-primary-color-dark)',
        boxShadow: '10px 10px 21px -12px rgba(0,0,0,0.6)',
      },
      iconTheme: {
        primary: 'rgb(66, 233, 16)',
        secondary: '#FFFAEE',
      },
    });
  }
}