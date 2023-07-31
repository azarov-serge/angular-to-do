import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthStore } from '../../auth/stores/auth.store';
import { paths } from '../../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authStore: AuthStore) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authStore.data.value.user) {
      this.router.navigate([`/${paths.sinIn}`]);
    }

    return Boolean(this.authStore.data.value.user);
  }
}

export const IsAuthguard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => inject(AuthGuard).canActivate(route, state);
