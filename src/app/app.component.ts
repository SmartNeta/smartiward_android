import { ComplaintsPage } from './../pages/complaints/complaints';
import { Component, ViewChild } from '@angular/core';
import { Platform,AlertController, MenuController, Nav, App, ToastController,Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { CommonService } from '../providers/common.service';

import { SettingsPage } from '../pages/settings/settings';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LoginPage } from '../pages/login/login';
import { RegComplaintsPage } from '../pages/registered_complaints/reg_complaints'
import { DepartmentPage } from '../pages/department/department';
import { ContactUsPage }  from '../pages/contact-us/contact_us';
import { NotificationsPage } from '../pages/notifications/notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make WalkthroughPage the root (or first) page
  // rootPage: any = TabsNavigationPage;
  // rootPage: any = WalkthroughPage
  rootPage: any;
  textDir: string = "ltr";
  imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
  notificationData:any;
  pages: Array<{title: any, icon: string, component: any}>;
  pushPages: Array<{title: any, icon: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public push: Push,
    public events: Events,
    public commonService:CommonService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');

    // app.viewWillEnter.subscribe(
    //   () => console.log('view about to be entered')
    // )

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      console.log(localStorage.getItem('voterId'));
      if (localStorage.getItem('voterId') == null) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = ComplaintsPage;
      }
      if (this.platform.is('cordova')) { 
        this.initPushNotification();
      }

    });
  

    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                
      // Checks if can go back before show up the alert
      if(activeView.name === 'ComplaintsPage') {
          if (nav.canGoBack()){
              nav.pop();
          } else {
              const alert = this.alertCtrl.create({
                  title: 'Exit app',
                  message: 'Are you sure?',
                  cssClass:'exit_alert',
                  buttons: [{
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        this.nav.setRoot('ComplaintsPage');
                        console.log('** App Output Canceled! **');
                      }
                  },{
                      text: 'Exit app',
                      handler: () => {
                        this.platform.exitApp();
                      }
                  }]
              });
              alert.present();
          }
      }
  });

  

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        if(event.lang == 'ar')
        {
          platform.setDir('rtl', true);
        }
        else
        {
          platform.setDir('ltr', true);
        }
        Observable.forkJoin(
          // this.translate.get('HOME'),
          // this.translate.get('FORMS'),
          // this.translate.get('FUNCTIONALITIES'),
          // this.translate.get('LAYOUTS'),
          // this.translate.get('SETTINGS'),
          // this.translate.get('WORDPRESS_INTEGRATION'),
          // this.translate.get('FIREBASE_INTEGRATION'),
          this.translate.get('Home'),
          this.translate.get('New complaint'),
          this.translate.get('My complaints'),
          this.translate.get('Language'),
          this.translate.get('ContactUs'),
          this.translate.get('Logout')
          
        ).subscribe(data => {
          this.pages = [
            { title: data[0], icon: 'home', component: ComplaintsPage },
            { title: data[1], icon: 'document', component: DepartmentPage },
            { title: data[2], icon: 'document', component: RegComplaintsPage },
            { title: data[3], icon: 'settings', component: SettingsPage },
            { title: data[4], icon: 'call', component: ContactUsPage },
            { title: data[5], icon: 'log-out', component: LoginPage }            
          ];

          this.pushPages = [
            // { title: data[3], icon: 'grid', component: LayoutsPage },
            // { title: data[4], icon: 'settings', component: SettingsPage },
            // { title: data[5], icon: 'logo-wordpress', component: WordpressMenuPage },
            // { title: data[6], icon: 'flame', component: SettingsPage }
          ];
        });
      });
      
  }

  
initPushNotification(){
  console.log("Inside push notification");
  this.push.hasPermission().then((res: any) => {
  if (res.isEnabled) {
  console.log('We have permission to send push notifications');
  }
  else {
  console.log('We don\'t have permission to send push notifications');
  }
  });
  
  // to initialize push notifications
  const options: PushOptions = {
  android: {
  // senderID: '986571927369',
  senderID: '629040521479',
  sound: 'true', 
  vibrate: 'true',
  icon:'note'
  },
  ios: {
  alert: 'true',
  badge: true,
  sound: 'true'
  },
  windows: {}
  };
  const pushObject: PushObject = this.push.init(options);
  pushObject.on('notification').subscribe((notification: any) =>{
  console.log("this.notificationData",notification);
  this.notificationData = notification.additionalData.data;
  console.log("this.nav.getActive()", this.nav.getActive());
  console.log("this.notificationData",this.notificationData);
  if(notification.additionalData.foreground==false){
    console.log("In False");
  }
  if(notification.additionalData.foreground==true){
    console.log("In True");
    let alert = this.alertCtrl.create({
      title: notification.title,
      message: notification.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    alert.present();
  }
  if(notification.additionalData.foreground==false){
  // if(this.notificationData.type=="individual"){
  this.nav.push(NotificationsPage);
  // }
  } 
  });
  console.log('...................................');
  // debugger
  pushObject.on('registration').subscribe((registration: any) => {
  console.log('Device registered', registration);
  localStorage.setItem('deviceId', registration.registrationId);
  });
  pushObject.on('error').subscribe  (error => 
  console.error('Error with Push plugin', error));
  console.log('...................................');
  }

  logout() {
    this.commonService.logOut().subscribe(resp=>{
      console.log("response",resp);
      localStorage.clear();
    },err=>{
      console.log('err',err);
    })
}

  openPage(page) {
    console.log(page.title);
    if (page.title == 'Logout') {
      this.logout();   
    }
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }
}
