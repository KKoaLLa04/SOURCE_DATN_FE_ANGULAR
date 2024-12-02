import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-access-denied',
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.scss'],
    standalone: true,
    imports: [TranslocoModule]
})
export class AccessDeniedComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  backToHome() {
    this.router.navigate(['/']);
  }

}
