import { Router, ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslocoService, TranslocoModule } from '@ngneat/transloco';
import { LANGUAGE } from 'src/app/_shared/utils/constant';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss', '../../helper-auth.scss'],
    standalone: true,
    imports: [
        TranslocoModule,
        FormsModule,
        NgFor,
        RouterLink,
        RouterOutlet,
    ],
})
export class ForgotPasswordComponent implements OnInit {

  step = 1;
  lang = localStorage.getItem('language') || 'vi';
  arrLang = LANGUAGE;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private router: Router, private translocoService: TranslocoService) {}

  ngOnInit(): void {
    if(this.router.url.includes('forgot-password/send-code')) this.step = 2;
    else if(this.router.url.includes('forgot-password/reset-password')) this.step = 3;
    else this.step = 1;

    this.router.events.subscribe(event => {
      if(this.router.url.includes('forgot-password/send-code')) this.step = 2;
      else if(this.router.url.includes('forgot-password/reset-password')) this.step = 3;
      else this.step = 1;
    })
  }

  changeLanguage() {
    localStorage.setItem('language', this.lang);
    this.translocoService.setActiveLang(this.lang);
  }
}
