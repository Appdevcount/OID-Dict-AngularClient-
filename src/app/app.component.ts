import { Component, OnInit } from '@angular/core';
import { AuthOptions, OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import jwt_decode   from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title='test';
  decodedToken!: { [key: string]: string; };
  // constructor(public oidcSecurityService: OidcSecurityService) {}

  // ngOnInit() {
  //   this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
  //     console.log('app authenticated', isAuthenticated);
  //     console.log(`Current access token is '${accessToken}'`);
  //   });
  // }
  // constructor(public oidcSecurityService: OidcSecurityService) {}
  // ngOnInit() {
  //   this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
  //     console.log('app authenticated', isAuthenticated);
  //     console.log(`Current access token is '${accessToken}'`);
  //   });
  // }
  configuration!: OpenIdConfiguration;
  // userDataChanged$: Observable<OidcClientNotification<any>>;
  // userDataChanged$: Observable<OidcClientNotification<any>>;
  userData$!: Observable<UserDataResult>;
  isAuthenticated = false;
  constructor(public oidcSecurityService: OidcSecurityService) {
    

  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
      console.log('app authenticated', isAuthenticated);
      // this.userData$ =userData;
      console.log(`Current access token is '${accessToken}'`);
      this.decodedToken = jwt_decode(accessToken);
    });
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('authenticated: ', isAuthenticated);
    });
    
    this.configuration = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;
  }

  login() {
    this.oidcSecurityService.authorize();
  //   const somePopupOptions = { width: 500, height: 500, left: 50, top: 50 };

  // const authOptionsOrNull: AuthOptions | null | undefined = null;/* ... */

  // this.oidcSecurityService.authorizeWithPopUp()//authOptionsOrNull, somePopupOptions)
  //   .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
  //   /* ... */
  //   });
  }

  refreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
  }

  logout() {
    this.oidcSecurityService.logoff();
    // this.oidcSecurityService.logoffLocal();
  }

  logoffAndRevokeTokens() {
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  revokeRefreshToken() {
    this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
  }

  revokeAccessToken() {
    this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
  }
}


