import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environment/environment';

//pages
// import { ListingPage } from '../pages/listing/listing';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { MapsPage } from '../pages/maps/maps';
import { NotificationsPage } from '../pages/notifications/notifications';
// import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
// import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
// import { SignupPage } from '../pages/signup/signup';
// import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
// import { SchedulePage } from '../pages/schedule/schedule';
// import { List1Page } from '../pages/list-1/list-1';
// import { List2Page } from '../pages/list-2/list-2';
// import { GridPage } from '../pages/grid/grid';
// import { FiltersPage } from '../pages/filters/filters';
// import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
// import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
// import { FormValidationsPage } from '../pages/form-validations/form-validations';


//custom components
import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';
import { GoogleMap } from '../components/google-map/google-map';
import { VideoPlayerModule } from '../components/video-player/video-player.module';
import { ValidatorsModule } from '../components/validators/validators.module';

//services
// import { ListingService } from '../pages/listing/listing.service';
// import { List1Service } from '../pages/list-1/list-1.service';
// import { List2Service } from '../pages/list-2/list-2.service';
// import { ScheduleService } from '../pages/schedule/schedule.service';
import { GoogleMapsService } from '../pages/maps/maps.service';
import { LanguageService } from '../providers/language/language.service';
import { CommonService } from '../providers/common.service';

// Ionic Native Plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer,FileUploadOptions,FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AndroidPermissions} from '@ionic-native/android-permissions';

//Smartneta
import { OtpPage } from '../pages/otp/otp';
import{ ComplaintsPage } from '../pages/complaints/complaints'
import{ RegComplaintsPage } from '../pages/registered_complaints/reg_complaints'
import{ DepartmentPage } from '../pages/department/department';
import{ SubdepartmentPage } from '../pages/subdepartment/subdepartment';
import{ RegisterIncident } from '../pages/register_incident/reg_incident';
// import{ ContactPartners } from '../pages/contact_partners/contact_partners';
import { LocationSelect } from '../pages/location-select/location-select';
import { NewsModalPage } from '../pages/complaints/news-modal/news_modal';
import { ContactUsPage }  from '../pages/contact-us/contact_us';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NotificationsPage,
    MapsPage,
    SettingsPage,
    // ListingPage,
    // TabsNavigationPage,
    // WalkthroughPage,
    // SignupPage,
    // ForgotPasswordPage,
    // SchedulePage,
    // List1Page,
    // List2Page,
    // GridPage,
    // FiltersPage,
    // TermsOfServicePage,
    // PrivacyPolicyPage,
		// FormValidationsPage,
		
    //custom components
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating,
    GoogleMap,
    OtpPage,
    ComplaintsPage,
    RegComplaintsPage,
    DepartmentPage,
    SubdepartmentPage,
    RegisterIncident,
    // ContactPartners,
    LocationSelect,
    NewsModalPage,
    ContactUsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
			modalEnter: 'modal-slide-in',
			modalLeave: 'modal-slide-out',
			pageTransition: 'ios-transition',
			swipeBackEnabled: false
		}),
		TranslateModule.forRoot({
    loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		}),
		VideoPlayerModule,
    ValidatorsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NotificationsPage,
    SettingsPage,
    MapsPage,
    OtpPage,
    ComplaintsPage,
    RegComplaintsPage,
    DepartmentPage,
    SubdepartmentPage,
    RegisterIncident,
    LocationSelect,
    NewsModalPage,
    ContactUsPage,
    // ContactPartners
    // ListingPage,
    // TabsNavigationPage,
    // WalkthroughPage,
    // ForgotPasswordPage,
    // SignupPage,
    // SchedulePage,
    // List1Page,
    // List2Page,
    // GridPage,
    // FiltersPage,
    // TermsOfServicePage,
    // PrivacyPolicyPage,
		// FormValidationsPage,
  ],
  providers: [
    // ListingService,
    // List1Service,
    // List2Service,
    // ScheduleService,
    GoogleMapsService,
		LanguageService,
	  SplashScreen,
	  StatusBar,
    InAppBrowser,
    Keyboard,
    Geolocation,
    FileTransfer,
    File,
    Camera,
    CommonService,
    Connectivity,
    GoogleMaps,
    // Network,
    Push,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
