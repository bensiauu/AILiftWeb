import {AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit, Renderer2} from '@angular/core';
import { User } from '@dis/components/profile-menu/profile-menu.props';
import { Notification } from '@dis/components/notifications-menu/notifications-menu.props';
import {
  handleNotificationsClick,
  getNotifications,
  YOUR_APP_NAME, APP_OPTIONS, DEFAULT_LANDING_NAME
} from '@dis/settings/behavior.config';
import { Router } from '@angular/router';
import { AuthKeycloakService } from '@dis/auth/auth-keycloak.service';
import { AuthGuard } from '@dis/auth/auth.guard';
import { KeycloakService } from 'keycloak-angular';

import { StorageService } from '@dis/services/storage/storage.service';
import {TranslateService} from '@ngx-translate/core';
import {DOCUMENT} from '@angular/common';
import {MenuService} from "@dis/services/menu/menu.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterContentChecked {

  languages: any[];
  languageSelected: any;
  isSelectionEnabled: any;
  isNotificationEnabled: any;
  isDarkMode = false;
  classNameDarkMode: string;
  user: User;
  notifications: Array<Notification>;
  appName = DEFAULT_LANDING_NAME;
  currentFocusedMenu = 'none';
  isMenuCollapsed = true;
  isSideMenuSelected = true;
  isLoggedIn$: Promise<boolean>;
  dataReady: boolean = false;


  constructor(
    private _auth: AuthKeycloakService,
    private _roleGuardService: AuthGuard,
    private keycloakService: KeycloakService,
    private _router: Router,
    private menu: MenuService,
    private _storage: StorageService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {

    // retrieve Language list from environment variable
    // Only set language if i18n is enabled.
    this.isSelectionEnabled = APP_OPTIONS.i18n.isSelectionEnabled;
    this.languages = APP_OPTIONS.i18n.supported;
    this.languageSelected = this.languages.find(item => item && item.value === APP_OPTIONS.i18n.default);
    this.translate.setDefaultLang(this.languageSelected.value);
    this.translate.use(this.languageSelected.value);

    this.isNotificationEnabled = APP_OPTIONS.notification.isNotificationEnabled;

    // Check if menu is expanded or collapsed
    if (APP_OPTIONS.sidemenu ) {
      this.isSideMenuSelected = APP_OPTIONS.sidemenu.isSelected ? APP_OPTIONS.sidemenu.isSelected : false;
      if (!this.isSideMenuSelected) {
        this.isMenuCollapsed = true;
      } else {
        this.isMenuCollapsed = APP_OPTIONS.sidemenu.collapsedByDefault ? APP_OPTIONS.sidemenu.collapsedByDefault : false;
      }
    }

    this.classNameDarkMode  = APP_OPTIONS.darkmode.className;
    // Check and set darkmode
    if (APP_OPTIONS.darkmode && APP_OPTIONS.darkmode.isDefaultDarkMode) {
      this.renderer.addClass(this.document.body,  this.classNameDarkMode);
      this.isDarkMode = true;
    }

  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }


  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.checkIsLoggedIn();
    console.log("Init the layout page");
    this.user = await this._auth.getUserDetails();
    if (this.user && this.user.id) this.getData();

    // this.keycloakService.getToken().then(token => {
    //   console.log(token);
    // });

    if(this.isLoggedIn$ && this._auth.isAllowedToAccess()) {
      setTimeout(() => {
        this.dataReady = true;
        console.log(this.dataReady);
      }, 500);
    }

    console.log("Data ready: " + this.dataReady);

    const pageNameChangeEmitter = this.menu.getPageNameChangeEmitter();
    pageNameChangeEmitter.subscribe(res => {
      this.appName = res;
    })
  }

  getData = async () => {
    this.notifications = await getNotifications();
  }

  onNotificationClick = notificationId => {
    handleNotificationsClick(notificationId);
  }

  logout() {
    this._auth.logout();
  }

  isLoginView() {
    return this._router.url === '/login';
  }

  checkIsLoggedIn() {
    console.log('Start checking is log in....');
    this.isLoggedIn$ = this._auth.isLoggedIn();
  }

  isApprovedUser() {
    return this._roleGuardService.isApprovedUser();
  }

  languageChange(result): void {
    this.translate.use(result.value);
  }

  menuToggle(): void{
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  onThemeChange($event): void {
    if (this.document.body.classList.contains( this.classNameDarkMode)){
      this.setDarkModeOff();
    }else {
      this.setDarkModeOn();
    }
  }

  private setDarkModeOn(): void{
    this.renderer.addClass(this.document.body,  this.classNameDarkMode);
  }

  private setDarkModeOff(): void{
    this.renderer.removeClass(this.document.body,  this.classNameDarkMode);
  }

}
