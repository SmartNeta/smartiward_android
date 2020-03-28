import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

// import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
// import { SignupPage } from '../signup/signup';
// import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { OtpPage } from '../otp/otp';

// import { FacebookLoginService } from '../facebook-login/facebook-login.service';
// import { GoogleLoginService } from '../google-login/google-login.service';
// import { TwitterLoginService } from '../twitter-login/twitter-login.service';
import { CommonService } from '../../providers/common.service';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  res: any;
  main_page: { component: any };
  loading: any;
  imageUrl: string = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
  // public obj = {
  //   username:"",
  //   password:"",
  //   action:"clientLogin"
  // }


  constructor(
    public navCtrl: NavController,
    public commonService: CommonService,
    // public facebookLoginService: FacebookLoginService,
    // public googleLoginService: GoogleLoginService,
    // public twitterLoginService: TwitterLoginService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public menu: MenuController
  ) {
    // this.main_page = { component: TabsNavigationPage };

    this.login = new FormGroup({
      voterId: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required)
    });
  }


  ionViewDidEnter() {
    this.menu.swipeEnable(false);
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }

  doLogin(data) {
    this.loading = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loading.present();
    console.log("Parameters*********", data);
    this.commonService.generateOTP(data).subscribe(resp => {

      this.res = resp;
      console.log("REsponce*******" + JSON.stringify(this.res));
      this.loading.dismissAll();
      // this.nav.setRoot(this.main_page.component);
      if (this.res.msg == 'success') {
        // code...
        // this.storage.set('user_id',this.res.client_id);
        // localStorage.setItem('userid',this.res.client_id);
        // this.presentToast(this.res.msg);
        this.navCtrl.push(OtpPage, { voterId: data.voterId, mobile: this.login.value.mobile });
      } else {
        this.presentToast(this.res.msg);
      }


      // this.navCtrl.push(LandingPage);
      //  }
    }, err => {
      this.loading.dismissAll();
      //  this.presentToast(err.statusText);
      console.log('err', err);
    });
  }

  // doFacebookLogin() {
  //   this.loading = this.loadingCtrl.create();

  //   // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
  //   // let this = this;

  //   this.facebookLoginService.getFacebookUser()
  //   .then((data) => {
  //      // user is previously logged with FB and we have his data we will let him access the app
  //     this.navCtrl.setRoot(this.main_page.component);
  //   }, (error) => {
  //     //we don't have the user data so we will ask him to log in
  //     this.facebookLoginService.doFacebookLogin()
  //     .then((res) => {
  //       this.loading.dismiss();
  //       this.navCtrl.setRoot(this.main_page.component);
  //     }, (err) => {
  //       console.log("Facebook Login error", err);
  //     });
  //   });
  // }

  // doGoogleLogin() {
  //   this.loading = this.loadingCtrl.create();

  //   // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app

  //   this.googleLoginService.trySilentLogin()
  //   .then((data) => {
  //      // user is previously logged with Google and we have his data we will let him access the app
  //     this.navCtrl.setRoot(this.main_page.component);
  //   }, (error) => {
  //     //we don't have the user data so we will ask him to log in
  //     this.googleLoginService.doGoogleLogin()
  //     .then((res) => {
  //       this.loading.dismiss();
  //       this.navCtrl.setRoot(this.main_page.component);
  //     }, (err) => {
  //       console.log("Google Login error", err);
  //     });
  //   });
  // }

  // doTwitterLogin(){
  //   this.loading = this.loadingCtrl.create();

  //   // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app

  //   this.twitterLoginService.getTwitterUser()
  //   .then((data) => {
  //      // user is previously logged with FB and we have his data we will let him access the app
  //     this.navCtrl.setRoot(this.main_page.component);
  //   }, (error) => {
  //     //we don't have the user data so we will ask him to log in
  //     this.twitterLoginService.doTwitterLogin()
  //     .then((res) => {
  //       this.loading.dismiss();
  //       this.navCtrl.setRoot(this.main_page.component);
  //     }, (err) => {
  //       console.log("Twitter Login error", err);
  //     });
  //   });
  // }

  // goToSignup() {
  //   this.navCtrl.push(SignupPage);
  // }

  // goToForgotPassword() {
  //   this.navCtrl.push(ForgotPasswordPage);
  // }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      dismissOnPageChange: true,
      duration: 3000
    });
    toast.present();
  }

}
