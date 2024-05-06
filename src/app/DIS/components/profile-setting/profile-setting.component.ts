import {Component, OnInit, Output, Input, EventEmitter, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {darkModeClassName} from '@dis/constants/application.constants';
import {TranslationService} from '@dis/services/message/translation.service';
import { APP_OPTIONS } from '@dis/settings/behavior.config';
import { CategoryAxisNotesLabelComponent } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {
  classNameDarkMode: string;
  isMobile : boolean;
  
  darkModeMessageOption: any = {
    header: 'Darkmode',
    translucent: true
  };
  @Output() newLanguageEvent = new EventEmitter<string>();
  isDarkMode: boolean;
  languages: any[];
  languageSelected: any;
  constructor(@Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
              private translate: TranslateService,
              private translation: TranslationService) {
                this.isMobile = environment.isMobile ? true : false;
               }

  ngOnInit(): void {

    this.classNameDarkMode  = APP_OPTIONS.darkmode.className;
    
    // Check and set darkmode
    if (APP_OPTIONS.darkmode && APP_OPTIONS.darkmode.isDefaultDarkMode) {
      this.renderer.addClass(this.document.body,  this.classNameDarkMode);
      this.isDarkMode = true;
    }


    this.languages = this.translation.getAllSupportedLanguage();
    let sessionLanguage = this.translation.getLanguageInSessionStorage();
    console.log(sessionLanguage);
    if(sessionLanguage && sessionLanguage.value){
      this.languageSelected = sessionLanguage;
      this.translate.use(sessionLanguage.value);
    }else {

      this.languageSelected = this.languages.find(item => item && item.value === environment.i18n.default);
      this.translate.use(this.languageSelected.value);
    }
    // this.translate.setDefaultLang(this.languageSelected.value);
    // this.translate.use(this.languageSelected.value);

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

  languageChange(result): void {
    console.log(result.value);
    this.translate.use(result.value);
    this.translation.setLanguageInSessionStorage(result.value);
  }

}
