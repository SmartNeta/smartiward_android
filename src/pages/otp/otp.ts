import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Platform, Events, MenuController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { CommonService } from '../../providers/common.service';
import { ComplaintsPage } from '../complaints/complaints'
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var SMS: any;
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  form: FormGroup;
  loading: any;
  otp: any;
  voterId: any;
  stateId: any;
  res: any;
  message: any;
  mobile: any;
  deviceType: any;
  imageUrl: string = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
  @ViewChild('otp1') otp1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public commonService: CommonService, public androidPermissions: AndroidPermissions, public platform: Platform, public events: Events, public menu: MenuController) {
    this.voterId = this.navParams.get('voterId');
    this.mobile = this.navParams.get('mobile');
    console.log("this.voterId", this.voterId);
    console.log("this.mobile", this.mobile);
    // this.form = new FormGroup({
    //   otp1: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]),
    //   otp2: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]),
    //   otp3: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]),
    //   otp4: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)])
    // });
    this.form = new FormGroup({
      otp: new FormControl('', Validators.required),
    });
    if (this.platform.is('ios')) {
      this.deviceType = "ios"
    } else if (this.platform.is('android')) {
      this.deviceType = "android"
    }
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
  ionViewWillEnter() {
    // setTimeout(() => {
    //   this.otp1.setFocus();
    // }, 750);

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
    //   success => console.log('Permission granted'),
    // err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    // );

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  // ReadListSMS()
  // {

  // this.platform.ready().then((readySource) => {

  // let filter = {
  //       box : 'inbox', // 'inbox' (default), 'sent', 'draft'
  //       indexFrom : 0, // start from index 0
  //       maxCount : 10, // count of SMS to return each time
  //             };

  //       if(SMS) SMS.listSMS(filter, (ListSms)=>{

  //           console.log("Sms",ListSms);
  //           },

  //           Error=>{
  //           console.log('error list sms: ' + Error);
  //           });
  //     });
  // }

  // ionViewDidEnter()
  // {
  // this.menu.swipeEnable(false);
  // this.platform.ready().then((readySource) => {

  // if(SMS) SMS.startWatch(()=>{
  //         console.log('watching started');
  //       }, Error=>{
  //       console.log('failed to start watching');
  //   });
  //   document.addEventListener('onSMSArrive', (e:any)=>{
  //       SMS.stopWatch();
  //       var sms = e.data;
  //       console.log("sms",sms);
  //       var smsAdd = sms.address;
  //         if(smsAdd.substr(smsAdd.length-6,6) == 'SAMPRK'){
  //           this.message = sms.body;
  //           this.form.setValue({otp4: this.message[this.message.length-1],
  //                               otp3: this.message[this.message.length-2],
  //                               otp2: this.message[this.message.length-3],
  //                               otp1: this.message[this.message.length-4] });
  //           console.log("this.form",this.form);
  //           this.submit();
  //         }   
  //       });
  //     });
  // }

  submit() {
    let data = {};
    // data['phone'] = this.mobile;
    // data['otp'] = this.form.value.otp1 + this.form.value.otp2 + this.form.value.otp3 + this.form.value.otp4;

    data['otp'] = this.form.value.otp;
    if (data['otp'].length != 4) {
      this.presentToast('Invalid OTP');
      return false;
    }
    data['mobile'] = this.mobile;
    data['voterId'] = this.voterId;
    data['deviceId'] = localStorage.getItem('deviceId');
    data['deviceType'] = this.deviceType;
    this.loading = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loading.present();
    console.log("Parameters*********" + data);
    this.commonService.verifyOTP(data).subscribe(data => {

      this.res = data;
      console.log("REsponce*******" + JSON.stringify(this.res));
      this.loading.dismissAll();
      // this.nav.setRoot(this.main_page.component);
      if (this.res.msg == 'success') {
        // code...
        // this.storage.set('user_id',this.res.client_id);
        // localStorage.setItem('userid',this.res.client_id);
        this.stateId = this.res.citizen.booth.ward.assemblyConstituency.parliamentaryConstituency.district.stateAssembly.id;
        localStorage.setItem('voterId', this.voterId);
        localStorage.setItem('citizenId', this.res.citizen.id);
        localStorage.setItem('stateId', this.stateId);
        localStorage.setItem('citizen', JSON.stringify(this.res.citizen));
        this.navCtrl.setRoot(ComplaintsPage);
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
    // this.doLogin(data);
  }


  ReSendOTP() {
    let data = {};
    this.loading = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loading.present();
    data['mobile'] = this.mobile;
    data['voterId'] = this.voterId;
    console.log("Parameters*********", data);
    this.commonService.generateOTP(data).subscribe(resp => {

      this.res = resp;
      console.log("REsponce*******" + JSON.stringify(this.res));
      this.loading.dismissAll();
      if (this.res.msg == 'success') {
        this.presentToast("Request for OTP initiated");
        // this.navCtrl.push(OtpPage, { voterId: data.voterId, mobile: this.login.value.mobile });
      } else {
        this.presentToast(this.res.msg);
      }
    }, err => {
      this.loading.dismissAll();
      //  this.presentToast(err.statusText);
      console.log('err', err);
    });
  }

  next(el, value) {
    console.log("this.form.value[value]", this.form.value[value], value);
    if (this.form.value[value].length == 0) {
      //console.log("value===1", this.form.value.otp1.length);
      //console.log("value===2", this.form.value.otp2);
    } else {
      el.setFocus();
      //console.log("else value===1", this.form.value.otp1.length);
      //console.log("esle alue===2", this.form.value.otp2.length);
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (!inputChar) {
      return false;
    }
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

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