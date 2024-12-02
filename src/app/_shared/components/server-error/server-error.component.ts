import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-server-error',
    templateUrl: './server-error.component.html',
    styleUrls: ['./server-error.component.scss'],
    standalone: true,
    imports: [TranslocoModule]
})
export class ServerErrorComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }
  backToHome() {
    this.router.navigate(['/']);
  }
}
