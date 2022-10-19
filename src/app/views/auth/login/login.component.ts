import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  @ViewChild('btnGoogle') btnGoogle: ElementRef;
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log("Google's One-tap sign in script loaded!");

      // @ts-ignore
      google.accounts.id.initialize({
        // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
        client_id:
          '634108688122-ovgqag6htrhafluofsd7p8k13hkollgu.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
        // auto_select: true,
        // cancel_on_tap_outside: false,
      });

      // OPTIONAL: In my case I want to redirect the user to an specific path.
      // @ts-ignore
      // google.accounts.id.prompt((notification: PromptMomentNotification) => {
      //   console.log('Google prompt event triggered...');

      //   if (notification.getDismissedReason() === 'credential_returned') {
      //     this.ngZone.run(() => {
      //       this.router.navigate(['app/dashboard'], { replaceUrl: true });
      //       console.log('Welcome back!');
      //     });
      //   }
      // });
      google.accounts.id.renderButton(
        this.btnGoogle.nativeElement,
        {
          theme: 'filled_black',
          size: 'large',
          width: 250,
          height: 50,
          longtitle: true,
        } //
      );
    };
  }

  looggin() {}

  authenticationResponse() {
    console.log('called');
  }

  handleCredentialResponse(response: any) {
    // Decoding  JWT token...
    let decodedToken: any | null = null;
    // try {
    //   decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
    // } catch (e) {
    //   console.error('Error while trying to decode token', e);
    // }
    console.log('decodedToken', response);

    this.authService.googleLogin(response.credential).subscribe((res) => {
      // console.log(res);
      this.ngZone.run(() => {
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 450);
      });
    });
  }
}
