import { Router } from '@angular/router';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { TranslocoService, TranslocoModule } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { AVATAR_DEFAULT } from 'src/app/_shared/utils/constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalChangePasswordGlobalComponent } from 'src/app/_shared/modals/modal-change-password/modal-change-password.component';
import { NgIf } from '@angular/common';
import {en_US, NzI18nService, vi_VN} from "ng-zorro-antd/i18n";
import {GeneralService} from "../../../../../_services/general.service";
import {NzDropDownDirective, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";

@Component({
    selector: 'app-user-inner',
    templateUrl: './user-inner.component.html',
    styleUrls: ['./user-inner.component.scss'],
    standalone: true,
    imports: [TranslocoModule, NgIf, NzDropDownDirective, NzDropdownMenuComponent]
})
export class UserInnerComponent implements OnInit {
  language: LanguageFlag;
  langs = languages;
  private unsubscribe: Subscription[] = [];
  user: any;
  isOpen = true;
  lang = localStorage.getItem('language') ||'vi';
  avatarDefault = AVATAR_DEFAULT;
  layoutCode: string;
  visibleUserMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translocoService: TranslocoService,
    private modalService: NgbModal,
    private generalService: GeneralService,
    private i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('User'));
    this.layoutCode = localStorage.getItem('currentLayout');
  }

  viewProfile() {
    if (this.layoutCode === 'student'){
      this.router.navigate(['student/profile']);
    }
    else {
      this.router.navigate(['parent/profile-student']);
    }
  }


  logout() {
    this.authService.logout().subscribe((res: any) => {
      let lang = localStorage.getItem('language');
      localStorage.clear();
      localStorage.setItem('language', lang);
      this.router.navigate(['/auth/login'],{
        queryParams: {},
      }).then(() => {
        window.location.reload();
      });
    }, err => {
      this.generalService.showToastMessageError400(err);
    })
  }

  selectLanguage(lang: string) {
    this.lang = lang;
    localStorage.setItem('language', lang);
    this.translocoService.setActiveLang(lang);
    this.i18n.setLocale(lang === 'vi' ? vi_VN : en_US);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  changePassword() {
    const modalRef = this.modalService.open(ModalChangePasswordGlobalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static', // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: 'changePassword',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        userId: this.user?.Id,
        account: this.user?.FullName,
        code: this.user?.Code,
        username: this.user.Username,
        service: this.generalService,
      },
    };


    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.logout();
        }
      },
      (reason) => { }
    );
  }

}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'zh',
    name: 'Mandarin',
    flag: './assets/media/flags/china.svg',
  },
  {
    lang: 'es',
    name: 'Spanish',
    flag: './assets/media/flags/spain.svg',
  },
  {
    lang: 'ja',
    name: 'Japanese',
    flag: './assets/media/flags/japan.svg',
  },
  {
    lang: 'de',
    name: 'German',
    flag: './assets/media/flags/germany.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg',
  },
]
