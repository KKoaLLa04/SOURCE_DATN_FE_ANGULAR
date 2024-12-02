import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { NavigationStart, Router } from '@angular/router';
import { Select2 } from '../_models/gengeral/select2.model';

const state = {
  backUrlImport: '' as string,
  isOpenSidebar: false as boolean,
  selectedSidebar: 'dashboard' as string,
  schoolId: '' as string,
  logo: '' as string,
  schoolYearId: '' as string,
  schoolYearIdGUID: '' as string,
  dataSchoolYear: [] as any,
  dataSchool: [] as any,
  dataGrades: [] as Select2[],
  dataSubject: [] as Select2[],
  layout: '' as string,
  educationalStage: 0 as number,
  isLogin: false as boolean,
  isOpenModal: false as boolean,
  isLoading: false as boolean,
  checkLogin: false as boolean,
  currentLink: '' as string,
  emailCurrentSchool: '' as string,
  currentCatalog: '' as string,
  currentUser: {} as any,
  verificationCodeIsIncorrect: false as boolean,
  newPasswordIsIncorrect: false as boolean,
  confirmNewPasswordIsIncorrect: false as boolean
};
type State = typeof state;
@Injectable()
export class GlobalStore extends ComponentStore<State> {
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    super(state);
  }

  get schoolId():string {
    return localStorage.getItem("currentSchoolId") ?? "";
  }

  set schoolId(value:string) {
    localStorage.setItem("currentSchoolId",value);
    this.patchState({ schoolId: value });
  }

  get schoolYearId():string {
    return localStorage.getItem("currentSchoolYearId") ?? "";
  }

  set schoolYearId(value:string) {
    localStorage.setItem("currentSchoolYearId",value);
    this.patchState({ schoolYearId: value });
  }

  get schoolYearIdGUID():string {
    let result:string = "";
    const dataSchoolYearString = localStorage.getItem("dataSchoolYear");
    const dataSchoolYearFromLocalStorage = dataSchoolYearString ? JSON.parse(dataSchoolYearString) : [];
    const dataSchoolYearWithCurrentSchoolId = dataSchoolYearFromLocalStorage.find((item:any)=>item.schoolId == this.schoolId);
    if(dataSchoolYearWithCurrentSchoolId.data && dataSchoolYearWithCurrentSchoolId.data.length > 0){
      let dataCurrentSchoolYear = dataSchoolYearWithCurrentSchoolId.data.find((schoolYear:any) => schoolYear.idNumber == this.schoolYearId);
      if(dataCurrentSchoolYear){
        result = dataCurrentSchoolYear.id;
      }
    }

    return result;
  }

  get educationalStage():number {
    const ressult:number = localStorage.getItem('currentUnit')
    ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages
    : null;
    return ressult;
  }

  get dataSchoolYear():any[] {
    const dataSchoolYearString = localStorage.getItem("dataSchoolYear");
    const dataSchoolYearFromLocalStorage = dataSchoolYearString ? JSON.parse(dataSchoolYearString) : [];
    const dataSchoolYearWithCurrentSchoolId = dataSchoolYearFromLocalStorage.find((item:any)=>item.schoolId == this.schoolId);
    return dataSchoolYearWithCurrentSchoolId.data ?? [];
  }

  get dataSchool():any[] {
    const dataSchoolString = localStorage.getItem("dataSchool");
    const dataSchoolYearFromLocalStorage = dataSchoolString ? JSON.parse(dataSchoolString) : [];
    return dataSchoolYearFromLocalStorage ?? [];
  }

  get dataGrades():Select2[] {
    const dataGradeString = localStorage.getItem("dataConfigSystem");
    const dataGradeInLocalStorage = dataGradeString ? JSON.parse(dataGradeString)?.grades : [];
    const dataConvertSelect2:Select2[] = [];
    if(dataGradeInLocalStorage && dataGradeInLocalStorage.length > 0){
      dataGradeInLocalStorage.forEach(item => {
        dataConvertSelect2.push({
          label: item.name,
          value: item.id,
          data: item
        })
      });
    }
    return dataConvertSelect2;
  }

  get dataSubject():Select2[] {
    const dataSubjectString = localStorage.getItem("dataConfigSystem");
    const dataSubjectInLocalStorage = dataSubjectString ? JSON.parse(dataSubjectString)?.subjects : [];
    const dataConvertSelect2:Select2[] = [];
    if(dataSubjectInLocalStorage && dataSubjectInLocalStorage.length > 0){
      dataSubjectInLocalStorage.forEach(item => {
        dataConvertSelect2.push({
          label: item.name,
          value: item.id,
          data: item
        })
      });
    }
    return dataConvertSelect2;
  }

  get emailCurrentSchool():string {
    let email = "";
    const dataSchoolString = localStorage.getItem("dataSchool");
    const dataSchoolYearFromLocalStorage = dataSchoolString ? JSON.parse(dataSchoolString) : [];
    if(dataSchoolYearFromLocalStorage && dataSchoolYearFromLocalStorage.length > 0){
      let dataCurrentSchool = dataSchoolYearFromLocalStorage.find((school:any) => school.id == this.schoolId);
      if(dataCurrentSchool){
        email = dataCurrentSchool.email;
      }
    }
    return email;
  }

  get logo():string {
    let logo:string = "";
    const dataSchoolString = localStorage.getItem("dataSchool");
    const dataSchoolYearFromLocalStorage = dataSchoolString ? JSON.parse(dataSchoolString) : [];
    if(dataSchoolYearFromLocalStorage && dataSchoolYearFromLocalStorage.length > 0){
      let dataCurrentSchool = dataSchoolYearFromLocalStorage.find((school:any) => school.id == this.schoolId);
      if(dataCurrentSchool){
        logo = dataCurrentSchool.logo;
      }
    }
    return logo;
  }

  get layout():string {
    return localStorage.getItem("currentLayout") ?? "";
  }

  get currentUser(): any {
    let userInfor = localStorage.getItem("User");
    return userInfor ? JSON.parse(userInfor) : {};
  }

  set currentUser(value: any) {
    this.patchState({ currentUser: value });
  }

  get currentLink(): string {
    return this.get().currentLink;
  }

  set currentLink(value: string) {
    this.patchState({ currentLink: value });
  }

  get backUrlImport(): string {
    return localStorage.getItem("backUrlImport") ?? "";
  }

  set backUrlImport(value: string) {
    localStorage.setItem("backUrlImport",value);
    this.patchState({ backUrlImport: value });
  }

  get currentCatalog(): string {
    return this.get().currentCatalog;
  }

  set currentCatalog(value: string) {
    this.patchState({ currentCatalog: value });
  }

  get isLogin(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  set isLogin(value: boolean) {
    this.patchState({ isLogin: value });
  }

  get isOpenSidebar(): boolean {
    return this.get().isOpenSidebar;
  }

  set isOpenSidebar(value: boolean) {
    this.patchState({ isOpenSidebar: value });
  }

  get selectedSidebar(): string {
    return this.get().selectedSidebar;
  }

  set selectedSidebar(name: string) {
    this.patchState({ selectedSidebar: name });
  }

  get checkLogin(): boolean {
    return this.get().checkLogin;
  }

  set checkLogin(value: boolean) {
    this.patchState({ checkLogin: value });
  }

  get isLoading(): boolean {
    return this.get().isLoading;
  }

  set isLoading(value: boolean) {
    this.patchState({ isLoading: value });
  }

  get isOpenModal(): boolean {
    return this.get().isOpenModal;
  }

  set isOpenModal(value: boolean) {
    this.patchState({ isOpenModal: value });
  }

  scrollTop() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        window.scrollTo(0, 0);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogin = false;
    this.currentUser = {};
    window.location.reload();
  }

  loginAgain() {
    localStorage.removeItem('token');
    this.isLogin = false;
    this.currentUser = {};
    this.router.navigate(['/login']).then(() => {
      window.location.href = '/login';
    });
  }

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

  changePassword(value: any) {
  }

  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  turnOffSidebar() {
    this.isOpenSidebar = false;
  }

  openSidebarByName(selectedSidebar: string) {
    this.selectedSidebar = selectedSidebar;
  }

  toggleModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  confirmModal(confirm: boolean) {
  }

  get verificationCodeIsIncorrect(): boolean { return this.get().verificationCodeIsIncorrect; }
  set verificationCodeIsIncorrect(value: boolean) { this.patchState({ verificationCodeIsIncorrect: value }); }
  toggleVerificationCodeIsIncorrect() {
    this.verificationCodeIsIncorrect = !this.verificationCodeIsIncorrect;
  }

  get newPasswordIsIncorrect(): boolean { return this.get().newPasswordIsIncorrect; }
  set newPasswordIsIncorrect(value: boolean) { this.patchState({ newPasswordIsIncorrect: value }); }
  toggleNewPasswordIsIncorrect() {
    this.newPasswordIsIncorrect = !this.newPasswordIsIncorrect;
  }

  get confirmNewPasswordIsIncorrect(): boolean { return this.get().confirmNewPasswordIsIncorrect; }
  set confirmNewPasswordIsIncorrect(value: boolean) { this.patchState({ confirmNewPasswordIsIncorrect: value }); }
  toggleConfirmNewPasswordIsIncorrect() {
    this.confirmNewPasswordIsIncorrect = !this.confirmNewPasswordIsIncorrect;
  }

  get dataCurrentSchool():string {
    const dataSchoolString = localStorage.getItem("dataSchool");
    const dataSchoolYearFromLocalStorage = dataSchoolString ? JSON.parse(dataSchoolString) : [];
    let dataCurrentSchool = null;
    if(dataSchoolYearFromLocalStorage && dataSchoolYearFromLocalStorage.length > 0){
      dataCurrentSchool = dataSchoolYearFromLocalStorage.find((school:any) => school.id == this.schoolId);
    }
    return dataCurrentSchool;
  }

}
