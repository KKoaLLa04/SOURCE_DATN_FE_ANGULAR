import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    standalone: true,
    imports: [TranslocoModule]
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }

  backToHome() {
    this.router.navigate(['/']);
  }

}
