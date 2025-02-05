import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const autorisationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Vérifier si nous sommes dans le navigateur
  if (isPlatformBrowser(platformId)) {
    const isAuthenticated = localStorage.getItem('id');

    if (!isAuthenticated) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  }

  // Si nous sommes sur le serveur, autoriser par défaut
  return true;
};

