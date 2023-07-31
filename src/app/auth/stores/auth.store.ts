import { Injectable } from '@angular/core';

import { IndexedDbService } from '../../shared/services/indexed-db/indexed-db.service';
import { BaseStore } from '../../shared/stores/base.store';

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends BaseStore<{
  user: User | null;
  isCheckAuth: boolean;
}> {
  constructor(private indexedDbService: IndexedDbService) {
    super();
  }

  public checkAuth = async (): Promise<void> => {
    if (!this.indexedDbService.isInited) {
      return;
    }

    this.data.value = {
      ...this.data.value,
      isCheckAuth: true,
    };

    try {
      const [authData] = await this.indexedDbService
        .from('auth')
        .select<AuthData>({
          key: 'authIsLoggedIn',
          value: 1,
        });

      if (authData) {
        this.data.value = {
          ...this.data.value,
          user: {
            id: authData.id,
            createdAt: authData.createdAt,
            login: authData.login,
          },
          isCheckAuth: false,
        };

        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.data.value = {
        ...this.data.value,
        isCheckAuth: false,
      };
    }
  };

  public signIn = async (data: {
    login: string;
    password: string;
  }): Promise<void> => {
    this.isLoading.value = true;
    const [authData] = await this.indexedDbService
      .from('auth')
      .select<AuthData>({
        key: 'authLogin',
        value: data.login,
      });

    if (!authData) {
      this.error.value = 'User not found';
      this.isLoading.value = false;

      return;
    }

    if (authData.password !== data.password) {
      this.error.value = 'Invalid password';
      this.isLoading.value = false;

      return;
    }

    await this.indexedDbService.from('auth').update<AuthData>({
      ...authData,
      isLoggedIn: 1,
    });

    this.data.value = {
      ...this.data.value,
      user: {
        id: authData.id,
        createdAt: authData.createdAt,
        login: authData.login,
      },
    };

    this.isLoading.value = false;
  };

  public signUp = async (data: {
    login: string;
    password: string;
  }): Promise<void> => {
    this.isLoading.value = true;

    const [authData] = await this.indexedDbService
      .from('auth')
      .select<AuthData>({
        key: 'authLogin',
        value: data.login,
      });

    if (authData) {
      this.error.value = 'User already exists';
      this.isLoading.value = false;

      return;
    }

    const createdAt = new Date();
    const id = await this.indexedDbService
      .from('auth')
      .insert<Omit<AuthData, 'id'>>({
        ...data,
        createdAt,
        isLoggedIn: 1,
      });

    this.data.value = {
      ...this.data.value,
      user: {
        id,
        createdAt,
        login: data.login,
      },
    };

    this.isLoading.value = false;
  };

  public signOut = async (): Promise<void> => {
    const [authData] = await this.indexedDbService
      .from('auth')
      .select<AuthData>({ key: 'id', value: this.data.value.user?.id });

    if (authData) {
      await this.indexedDbService.from('auth').update<AuthData>({
        ...authData,
        isLoggedIn: 0,
      });
    }
    this.data.value = { user: null, isCheckAuth: false };
  };
}
