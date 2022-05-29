import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    constructor(
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private apiService: ApiService
    ) { }

    public getToken(): string {
        return this.storage.getItem('travlr-token') as string;
    }

    public saveToken(token: string): void {
        this.storage.setItem('travlr-token', token);
    }

    public login(user: User): Promise<any> {
        return this.apiService.login(user)
            .then((authResp: AuthResponse) => this.saveToken(authResp.token));
    }

    public register(user: User): Promise<any> {
        return this.apiService.register(user)
            .then((authResp: AuthResponse) => this.saveToken(authResp.token));
    }

    public logout(): void {
        this.storage.removeItem('travlr-token');
    }

    public isLoggedIn(): boolean {
        const token: string = this.getToken();
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > (Date.now() / 1000);
        } else {
            return false;
        }
    }

    public getCurrentUser(): User {
        try {
            if (this.isLoggedIn()) {
                const token: string = this.getToken();
                const { email, name } = JSON.parse(atob(token.split('.')[1]));
                return { email, name } as User;
            } else {
                throw new Error("WRONG");
            }
            
        } catch(err) {
            throw(err);
        }
    }
}