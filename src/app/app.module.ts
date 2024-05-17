// Angular
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Environment
import { environment } from 'src/environments/environment';

// Addon
import { ClickOutsideModule } from 'ng-click-outside';
import { JwtModule } from '@auth0/angular-jwt';
import 'hammerjs';

// Kendo
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import {
  GridModule,
  PDFModule,
  ExcelModule
} from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { MenuModule } from '@progress/kendo-angular-menu';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ListViewModule } from '@progress/kendo-angular-listview';

// Components
import { NotificationsMenuComponent } from './DIS/components/notifications-menu/notifications-menu.component';
import { ProfileMenuComponent } from './DIS/components/profile-menu/profile-menu.component';
import { SidebarComponent } from './DIS/components/sidebar/sidebar.component';
import { LayoutComponent } from './DIS/components/layout/layout.component';

// App
import { AppRoutingModule } from './DIS/settings/routes/app-routing.module';
import { AppComponent } from './app.component';
import { ViewHeadingComponent } from './DIS/components/view-heading/view-heading.component';
import { ViewFilterComponent } from './DIS/components/view-filter/view-filter.component';
import { IndicatorCustomSampleComponent } from './DIS/components/indicator-custom-sample/indicator-custom-sample.component';

// Views
import { LoginComponent } from './DIS/views/login/login.component';
import { SamplePageComponent } from './DIS/views/sample-page/sample-page.component';
import { EditedPageComponent } from './DIS/views/edited-page/edited-page.component';
import {GaugesModule} from '@progress/kendo-angular-gauges';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { CustomUiBlockerComponent } from './DIS/components/custom-ui-blocker/custom-ui-blocker.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import {HttpInterceptorService} from '@dis/services/http/http-interceptor.service';
import { DashboardOneComponent } from './DIS/views/dashboard-one/dashboard-one.component';
import { DashboardTwoComponent } from './DIS/views/dashboard-two/dashboard-two.component';
import { DashboardThreeComponent } from './DIS/views/dashboard-three/dashboard-three.component';
import { InputFieldsComponent } from './DIS/views/input-fields/input-fields.component';
import { TablesComponent } from './DIS/views/tables/tables.component';
import {DialogModule, WindowModule} from '@progress/kendo-angular-dialog';
import {DatePickerModule, DateTimePickerModule} from '@progress/kendo-angular-dateinputs';
import { FormFillingComponent } from './DIS/views/form-filling/form-filling.component';
import {UploadModule} from '@progress/kendo-angular-upload';

//Keycloak configuration
import { KeycloakAngularModule } from 'keycloak-angular';
import { initializeKeycloak } from './DIS/init/keycloak-init.factory';
import { KeycloakService } from 'keycloak-angular';
import {MockedKeycloakService} from '@dis/services/mocks/mock-authentication';
import { HorizontalMenuComponent } from './DIS/components/horizontal-menu/horizontal-menu.component';
import { ProfileSettingComponent } from '@dis/components/profile-setting/profile-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TripComponent } from './trip-component/trip.component';

// Sort
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    NotificationsMenuComponent,
    ProfileMenuComponent,
    LoginComponent,
    SamplePageComponent,
    ViewHeadingComponent,
    ViewFilterComponent,
    IndicatorCustomSampleComponent,
    EditedPageComponent,
    CustomUiBlockerComponent,
    DashboardOneComponent,
    DashboardTwoComponent,
    DashboardThreeComponent,
    InputFieldsComponent,
    TablesComponent,
    FormFillingComponent,
    HorizontalMenuComponent,
    ProfileSettingComponent,
    DashboardComponent,
    TripComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: [environment.API_ROOT],
        disallowedRoutes: [environment.SSO_ENDPOINT]
      }
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    NavigationModule,
    IconsModule,
    LayoutModule,
    DropDownsModule,
    NotificationModule,
    GridModule,
    PDFModule,
    ExcelModule,
    ChartsModule,
    ListViewModule,
    MenuModule,
    IndicatorsModule,
    LabelModule,
    InputsModule,
    GaugesModule,
    WindowModule,
    DialogModule,
    UploadModule,
    KeycloakAngularModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BlockUIModule.forRoot({
      template: CustomUiBlockerComponent
    }), // Import BlockUIModule
    BlockUIHttpModule.forRoot({
      // blockAllRequestsInProgress: false
    }),
    DateTimePickerModule,
    DatePickerModule,
    // Import Block UI Http Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    // Mock KeyCloakService to override actual KeyCloakService during development
    MockedKeycloakService,
    {
      provide: KeycloakService,
      useClass: environment.production ? KeycloakService : MockedKeycloakService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    } // Initialize the Keycloak Connection
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
