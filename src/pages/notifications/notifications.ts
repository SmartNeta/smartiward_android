import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { CommonService } from '../../providers/common.service';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/Rx';

@Component({
  selector: 'notifications-page',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  notifications: any;
  notificationsCount: any;
  loading: any;
  citizenId:string;
  descText:any;
  imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
  
  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public commonService:CommonService,
    public toastCtrl: ToastController,
    public translate: TranslateService
  ) {
    this.loading = this.loadingCtrl.create({
      content: this.translate.instant('please wait')
    });
    this.citizenId = localStorage.getItem('citizenId');
    this.getAllText();
  }

  ionViewDidLoad() {
    this.getNotifications();
  }

  getNotifications(){
    this.loading.present();
    this.commonService.getNotificationData(this.citizenId).subscribe(res=>{
      console.log(res)
      this.notifications = res.notifications;
      this.notificationsCount = res.count;
      this.loading.dismiss();
    },err=>{
      console.log("err",err)
      this.loading.dismiss();
    });
  }

  markAsReadNotification(notificationId){
    console.log("this.citizenId",this.citizenId);
    let data = {
      "notificatoinId" : notificationId,
      "citizenId" : this.citizenId
    }
    this.commonService.markAsReadNotification(data).subscribe(res=>{
      this.presentToast(this.translate.instant('Mark as read'));
      this.getNotifications();
    },err=>{
      console.log("err",err)
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
      this.getNotifications();
      this.getAllText();
      refresher.complete();
    }, 2000);
  }

  getAllText(){
    this.commonService.getData().subscribe(res=>{
      console.log('res',res);
      this.descText = res.data;
    },err=>{
      console.log("err",err)
    });
  }
}
